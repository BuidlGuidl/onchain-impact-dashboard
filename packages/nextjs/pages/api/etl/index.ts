import weightingsJSON from "./weightings.json";
import { FlattenMaps, Types, startSession } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { OnchainMetricsByProject } from "~~/app/types/OSO";
import dbConnect from "~~/services/mongodb/dbConnect";
import ETLLog from "~~/services/mongodb/models/etlLog";
import GlobalScore, { TempGlobalScore } from "~~/services/mongodb/models/globalScore";
import Metric, { Metrics } from "~~/services/mongodb/models/metric";
import Project from "~~/services/mongodb/models/project";
import ProjectMovement, { IProjectMovement, TempProjectMovement } from "~~/services/mongodb/models/projectMovement";
import ProjectScore, { IProjectScore, TempProjectScore } from "~~/services/mongodb/models/projectScore";

// Vercel uses these exported constants https://vercel.com/docs/functions/configuring-functions
export const maxDuration = 300;
export const runtime = "nodejs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  try {
    const mongooseConnection = await dbConnect();
    // Log the ETL process
    const existingLog = await ETLLog.findOne({}, {}, { sort: { _id: -1 } });
    if (existingLog) {
      if (existingLog.status === "pending") {
        return res.status(400).json({ message: `ETL Process already running as of ${existingLog.date}` });
      }
      if (existingLog.status === "success" && isTooEarly(existingLog.date)) {
        return res.status(400).json({ message: `Too soon to run ETL Process. Last run: ${existingLog.date}` });
      }
    }

    const log = await ETLLog.create({ date: new Date(), status: "pending" });

    // Get weights from JSON file
    const weightings = weightingsJSON as { [key in keyof Metrics]: number };

    try {
      // Clear out the temp collection data in case of failed run
      console.log("Clearing temp collection data");
      await TempGlobalScore.deleteMany({});
      await TempProjectScore.deleteMany({});
      await TempProjectMovement.deleteMany({});

      // Get all the mapping data
      const { mapping } = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stub/mapping`).then(res => res.json());
      // Get metrics that are activated
      const metrics = await Metric.findAllActivated();
      if (!metrics) {
        throw new Error("No metrics found");
      }
      const metricNamesObj: Partial<Metrics> = metrics.reduce((acc: Partial<Metrics>, metric) => {
        acc[metric.name] = 0;
        return acc;
      }, {} as Partial<Metrics>);
      const dates = getDatesToProcess();
      // Process each day in parallel
      await Promise.all(
        dates.map(async day => {
          // Fetch data for the day
          const seriesResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/stub/series?date=${day.toISOString().split("T")[0]}`,
          ).then(res => res.json());

          if (!seriesResponse) {
            throw new Error(`No OSO Data for ${day}`);
          }
          const osoData = seriesResponse.data as OnchainMetricsByProject[];
          console.log(`Processing OSO response for each project on ${day.toISOString().split("T")[0]}`);

          const globalScoreData = Object.assign({}, metricNamesObj) as { [key in keyof Metrics]: number };
          const projectScoreOps = [];

          for (const project of osoData) {
            const projectMapping = mapping.find((map: any) => map.oso_name === project.project_name);
            if (!projectMapping) {
              console.error(`No mapping found for ${project.project_name}`);
              continue;
            }
            const projectId = projectMapping.application_id;
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
            projectScoreOps.push({
              insertOne: {
                document: projectScoreData,
              },
            });

            for (const metric of Object.keys(metricNamesObj) as (keyof Metrics)[]) {
              if (projectMetrics[metric]) {
                globalScoreData[metric] += projectMetrics[metric];
              }
            }
          }

          globalScoreData.impact_index = getImpactIndex(globalScoreData, weightings);

          // Batch insert project scores
          if (projectScoreOps.length > 0) {
            await TempProjectScore.bulkWrite(projectScoreOps);
          }
          await TempGlobalScore.create({ date: day, ...globalScoreData });
        }),
      );

      // Build the project metric summary data
      const today = dates[0];
      const day7 = dates[7];
      const day30 = dates[30];
      const day90 = dates[90];
      const day180 = dates[180];

      const projectMovementOps: any[] = [];

      // Fetch all projects and required scores at once
      const [projects, scoresToday, scoresDay7, scoresDay30, scoresDay90, scoresDay180] = await Promise.all([
        Project.find({}).lean(),
        TempProjectScore.find({ date: today }).lean(),
        TempProjectScore.find({ date: day7 }).lean(),
        TempProjectScore.find({ date: day30 }).lean(),
        TempProjectScore.find({ date: day90 }).lean(),
        TempProjectScore.find({ date: day180 }).lean(),
      ]);

      // Create a map for quick lookup
      const createScoreMap = (
        scores: (FlattenMaps<IProjectScore> & {
          _id: Types.ObjectId;
        })[],
      ) => {
        return scores.reduce((acc, score) => {
          if (!acc[score.projectId]) {
            acc[score.projectId] = {} as { [key: string]: any };
          }
          acc[score.projectId] = score;
          return acc;
        }, {} as { [key: string]: any });
      };

      const scoreMapToday = createScoreMap(scoresToday);
      const scoreMapDay7 = createScoreMap(scoresDay7);
      const scoreMapDay30 = createScoreMap(scoresDay30);
      const scoreMapDay90 = createScoreMap(scoresDay90);
      const scoreMapDay180 = createScoreMap(scoresDay180);

      projects.forEach(project => {
        console.log(`Processing project ${project.name}`);
        const projectId = project.id;
        const projectMovementData = {
          projectId,
          name: project.name,
          category: project.category,
          profileAvatarUrl: project.profileAvatarUrl,
          movementByMetric: {},
        } as IProjectMovement;

        for (const metric of Object.keys(metricNamesObj) as (keyof Metrics)[]) {
          const scoreToday = scoreMapToday[projectId]?.[metric] || 0;
          const scoreDay7 = scoreMapDay7[projectId]?.[metric] || 0;
          const scoreDay30 = scoreMapDay30[projectId]?.[metric] || 0;
          const scoreDay90 = scoreMapDay90[projectId]?.[metric] || 0;
          const scoreDay180 = scoreMapDay180[projectId]?.[metric] || 0;

          projectMovementData.movementByMetric[metric] = {
            7: getMovement(scoreToday, scoreDay7),
            30: getMovement(scoreToday, scoreDay30),
            90: getMovement(scoreToday, scoreDay90),
            180: getMovement(scoreToday, scoreDay180),
          };
        }

        projectMovementOps.push({
          insertOne: {
            document: projectMovementData,
          },
        });
      });

      // Batch insert project movements
      if (projectMovementOps.length > 0) {
        await TempProjectMovement.bulkWrite(projectMovementOps);
      }

      // Change collection names
      console.log("Swapping collection names");
      // Start a session
      const session = await startSession();
      try {
        // Start a transaction
        session.startTransaction();
        const collections = [GlobalScore, ProjectScore, ProjectMovement];
        for (const model of collections) {
          const name = model.collection.collectionName;
          // Rename current collection to old_collection
          await mongooseConnection.connection.db.collection(name).rename(`old_${name}`);
          // Rename temp_collection to collection
          await mongooseConnection.connection.db.collection(`temp_${name}`).rename(name);
          // Drop old_collection
          await mongooseConnection.connection.db.collection(`old_${name}`).drop();
        }

        // Commit the transaction
        await session.commitTransaction();
      } catch (err) {
        console.log("Aborting transaction");
        await session.abortTransaction();
        session.endSession();
        throw err;
      }

      session.endSession();

      // Delete temp models
      console.log("Removing Temp Models");
      await mongooseConnection.deleteModel("temp_GlobalScore");
      await mongooseConnection.deleteModel("temp_ProjectScore");
      await mongooseConnection.deleteModel("temp_ProjectMovement");
      console.log("ETL Process Completed");
    } catch (err) {
      console.error(err);
      await ETLLog.updateOne({ _id: log._id }, { status: "error", message: err });
      throw new Error(err as string);
    }
    // Log the ETL process
    await ETLLog.updateOne({ _id: log._id }, { status: "success" });
    res.status(200).json({ message: "ETL Process Completed", success: true });
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.status(500).json({ message: "ETL Process Encountered An Error:", error, success: false });
    }
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

const isTooEarly = (lastRunDate: Date): boolean => {
  const window = parseInt(process.env.ETL_WINDOW_MS || "0") || 85500000; // 23h 45m
  return lastRunDate > new Date(new Date().getTime() - window);
};
