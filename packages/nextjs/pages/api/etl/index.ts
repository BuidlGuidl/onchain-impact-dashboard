import weightingsJSON from "./weightings.json";
import { startSession } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { OnchainMetricsByProject } from "~~/app/types/OSO";
import dbConnect from "~~/services/mongodb/dbConnect";
import ETLLog from "~~/services/mongodb/models/etlLog";
import GlobalScore from "~~/services/mongodb/models/globalScore";
import Metric, { MetricNames, Metrics } from "~~/services/mongodb/models/metric";
import Project from "~~/services/mongodb/models/project";
import ProjectMetricSummary from "~~/services/mongodb/models/projectMetricSummary";
import ProjectScore, { IProjectScore } from "~~/services/mongodb/models/projectScore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  const weightings = weightingsJSON as { [key in keyof Metrics]: number };
  try {
    await dbConnect();
    // Log the ETL process
    const existingLog = await ETLLog.findOne({ status: "pending" });
    if (existingLog) {
      return res.status(400).json({ message: `ETL Process already running as of ${existingLog.date}` });
    }
    const log = await ETLLog.create({ date: new Date(), status: "pending" });
    res.status(200).json({ result: "ETL Process Started" });
    // Start a session
    const session = await startSession();

    // Start a transaction
    // session.startTransaction();
    try {
      // Clear out the previous data
      console.log("Clearing previous data");
      await GlobalScore.deleteMany({}, { session });
      await ProjectScore.deleteMany({}, { session });
      await ProjectMetricSummary.deleteMany({}, { session });
      // Update new data
      // Get all the mapping data
      const { mapping } = await fetch("http://localhost:3000/api/stub/mapping").then(res => res.json());
      // Get metrics that are activated
      const metrics = await Metric.findAllActivated();
      if (!metrics) {
        return res.status(404).json({ message: "No metrics found" });
      }
      const dates = getDatesToProcess();
      const globalScoreData = Object.assign({}, MetricNames) as { [key in keyof Metrics]: number };
      for (const day of dates) {
        // Get data from the stubbed API (Should be replaced with call to OSO)
        const seriesResponse = await fetch(
          `http://localhost:3000/api/stub/series?date=${day.toISOString().split("T")[0]}`,
        ).then(res => res.json());

        if (!seriesResponse) {
          return res.status(400).json(seriesResponse);
        }
        const osoData = seriesResponse.data as OnchainMetricsByProject[];
        console.log(`Processing OSO response for each project on ${day.toISOString().split("T")[0]}`);
        for (const project of osoData) {
          // Get the project id from mapping
          const projectMapping = mapping.find((map: any) => map.oso_name === project.project_name);
          if (!projectMapping) {
            // Skip projects that we don't have a mapping for
            console.error(`No mapping found for ${project.project_name}`);
            continue;
          }
          const projectId = projectMapping.application_id;
          // Create the project score
          const impact_index = getImpactIndex(project as unknown as Metrics, weightings);
          const projectMetrics = {} as { [key in keyof Metrics]: number };
          for (const metric of metrics) {
            const metricValue = project[metric.name as keyof OnchainMetricsByProject];
            if (!isNaN(metricValue as number)) {
              projectMetrics[metric.name as keyof Metrics] = parseInt(metricValue as string);
            }
          }
          const projectScoreData = Object.assign(projectMetrics, {
            date: day,
            projectId,
            impact_index,
          }) as IProjectScore;
          await ProjectScore.create([projectScoreData], { session });

          // Add the project metrics to the global score
          for (const metric of Object.keys(MetricNames) as (keyof Metrics)[]) {
            if (projectMetrics[metric]) {
              globalScoreData[metric] += projectMetrics[metric];
            }
          }
        }
        globalScoreData.impact_index = getImpactIndex(globalScoreData, weightings);
        await GlobalScore.create([{ date: day, ...globalScoreData }], { session });
      }
      // Build the project metric summary data
      console.log("Building project metric summary data");
      const today = dates[0];
      const day7 = dates[7];
      const day30 = dates[30];
      const day90 = dates[90];
      // Iterate over all projects
      for await (const project of Project.find({}).cursor()) {
        const projectScoreToday = await ProjectScore.find({ date: today, projectId: project.id }).session(session);
        const projectScoreDay7 = await ProjectScore.find({ date: day7, projectId: project.id }).session(session);
        const projectScoreDay30 = await ProjectScore.find({ date: day30, projectId: project.id }).session(session);
        const projectScoreDay90 = await ProjectScore.find({ date: day90, projectId: project.id }).session(session);
        for (const metric of Object.keys(MetricNames) as (keyof Metrics)[]) {
          const scoreToday = projectScoreToday[0][metric as keyof IProjectScore] as number;
          const scoreDay7 = projectScoreDay7[0] ? (projectScoreDay7[0][metric as keyof IProjectScore] as number) : 0;
          const scoreDay30 = projectScoreDay30[0] ? (projectScoreDay30[0][metric as keyof IProjectScore] as number) : 0;
          const scoreDay90 = projectScoreDay90[0] ? (projectScoreDay90[0][metric as keyof IProjectScore] as number) : 0;
          const metricSummary = {
            date: today,
            projectId: project.id,
            metricName: metric,
            7: getMovement(scoreToday, scoreDay7),
            30: getMovement(scoreToday, scoreDay30),
            90: getMovement(scoreToday, scoreDay90),
          };
          await ProjectMetricSummary.create([metricSummary], { session });
        }
      }
      // await session.commitTransaction();
      session.endSession();
      console.log("ETL Process Completed");
    } catch (err) {
      console.error(err);
      // console.log("aborting transaction");
      // await session.abortTransaction();
      session.endSession();
      await ETLLog.updateOne({ _id: log._id }, { status: "error", message: err });
      throw new Error(err as string);
    }
    // Log the ETL process
    await ETLLog.updateOne({ _id: log._id }, { status: "completed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const getMovement = (current: number, comparison: number) => {
  // This shortcuts the calculation if the values are the same and handles the case where one of the nums is 0
  if (current === comparison || isNaN(current) || isNaN(comparison) || current === 0 || comparison === 0) {
    return 0;
  }
  const max = Math.max(current, comparison);
  const min = Math.min(current, comparison);
  let diff = Math.round((max / min - 1) * 100);

  if (current < comparison) {
    diff = -diff;
  }
  return diff;
};

const getImpactIndex = (project: Metrics, weights: Metrics): number => {
  let impact_index = 0;
  const metricKeys = Object.keys(weights) as (keyof Metrics)[];
  let weightSum = 0;
  for (const metric of metricKeys) {
    weightSum += weights[metric];
  }
  // If the weights don't add up to 100 then we expect they are each a 0-100 percentage and need to be adjusted
  const indPct = Math.round(weightSum) !== 100;
  for (const metric of metricKeys) {
    const multiplier = indPct ? weights[metric] / weightSum : weights[metric];
    // Normalize the weights to their percentage of the total
    const projectMetric = project[metric as unknown as keyof Metrics];
    if (projectMetric) {
      impact_index += projectMetric * multiplier;
    }
  }
  return impact_index;
};

const getDatesToProcess = (): Date[] => {
  // Get missing days from database
  const dates = [] as Date[];
  const currentUTCDate = new Date(new Date().toISOString().split("T")[0]);
  const fillDays = parseInt(process.env.FILL_DAYS || "0") || 180;
  for (let i = 0; i < fillDays; i++) {
    const date = new Date(currentUTCDate);
    date.setDate(date.getDate() - i);
    dates.push(date);
  }
  return dates;
};
