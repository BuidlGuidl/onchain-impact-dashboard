import weightingsJSON from "../weightings.json";
import type { NextApiRequest, NextApiResponse } from "next";
import { OnchainMetricsByProject } from "~~/app/types/OSO";

type Metrics = {
  active_contract_count_90_days: number;
  address_count: number;
  address_count_90_days: number;
  days_since_first_transaction: number;
  gas_fees_sum: number;
  gas_fees_sum_6_months: number;
  high_activity_address_count_90_days: number;
  low_activity_address_count_90_days: number;
  medium_activity_address_count_90_days: number;
  multi_project_address_count_90_days: number;
  new_address_count_90_days: number;
  returning_address_count_90_days: number;
  transaction_count: number;
  transaction_count_6_months: number;
};

interface DataSet {
  score: number;
  rank: number;
  data: { [key in keyof Metrics]: { normalized: number; actual: string | number | undefined } };
  projectId: string;
}

interface LeaderboardGraphData {
  // projects: DataSet[];
  totalScore: number;
  metricTotals: Metrics;
  date: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  const weightings = weightingsJSON as { [key in keyof Metrics]: number };
  try {
    // Get data from the stubbed API
    // const mappings = await fetch("http://localhost:3000/api/stub/mappings").then(res => res.json());
    // const projects = await fetch("http://localhost:3000/api/stub/projects").then(res => res.json());
    const seriesResponse = await fetch("http://localhost:3000/api/stub/series").then(res => res.json());

    if (!seriesResponse) {
      return res.status(400).json(seriesResponse);
    }
    const series = seriesResponse.series as {
      [key: string]: OnchainMetricsByProject[];
    };
    const dateResults = [] as LeaderboardGraphData[];
    // Tally the totals in each metric for each day
    for (const date in series) {
      const data = series[date];
      const metricTotals: Metrics = {
        active_contract_count_90_days: 0,
        address_count: 0,
        address_count_90_days: 0,
        days_since_first_transaction: 0,
        gas_fees_sum: 0,
        gas_fees_sum_6_months: 0,
        high_activity_address_count_90_days: 0,
        low_activity_address_count_90_days: 0,
        medium_activity_address_count_90_days: 0,
        multi_project_address_count_90_days: 0,
        new_address_count_90_days: 0,
        returning_address_count_90_days: 0,
        transaction_count: 0,
        transaction_count_6_months: 0,
      };
      const projectsData = scoreProjectsByMetricWeight({ allProjects: data, metricWeights: weightings });
      // Get total score of all projects
      const totalScore = projectsData.reduce((acc, project) => acc + project.score, 0);
      for (const metric in metricTotals) {
        metricTotals[metric as keyof Metrics] = data.reduce(
          (acc, project) => acc + project[metric as keyof Metrics],
          0,
        );
      }
      const dateResult = {
        // projects: projectsData,
        totalScore,
        metricTotals,
        date,
      };
      // Add to array of date results
      dateResults.push(dateResult);
    }

    // Calculate the growth percentage overall for each project - Maybe do this in another method?
    res.status(200).json({ result: dateResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const scoreProjectsByMetricWeight = ({
  allProjects,
  metricWeights,
}: {
  allProjects: OnchainMetricsByProject[];
  metricWeights: Metrics;
}) => {
  const allMetrics = Object.keys(metricWeights) as (keyof Metrics)[];

  // Find the largest value for each metric and find multiple to make it 100
  const normalizers: { [key in keyof Metrics]: number } = {} as { [key in keyof Metrics]: number };
  for (const metric of allMetrics) {
    const weight = metricWeights[metric];
    if (!weight) {
      throw new Error(`Vector ${metric} not found`);
    }
    const max = Math.max(...allProjects.map(project => project[metric]));
    normalizers[metric] = max !== 0 ? 100 / max : 0;
  }

  const projectsData = [] as DataSet[];
  // Apply that multiple to each value in the metric and apply the weight
  for (const data of allProjects) {
    const relevant: DataSet = {
      data: {} as { [key in keyof Metrics]: { normalized: number; actual: string | number | undefined } },
      score: 0,
      rank: 0,
      projectId: data["project_id"],
    };
    for (const metric of allMetrics) {
      const weight = metricWeights[metric];
      if (!weight) {
        throw new Error(`Vector ${metric} not found`);
      }
      const actualValue = data[metric];
      const currentValue = data[metric];
      const normalizer = normalizers[metric];

      // Apply the normalizer to equalize the metrics
      const scaledValue = currentValue && normalizer ? currentValue * normalizer : 0;
      // Apply the weight
      relevant.data[metric] = {
        normalized: scaledValue && weight ? scaledValue * weight : 0,
        actual: actualValue,
      };
      // Add to the score
      relevant.score += relevant.data[metric]?.normalized || 0;
    }
    projectsData.push(relevant);
  }
  // Sort by score
  projectsData.sort((a, b) => b.score - a.score);
  // Add the rank
  for (let i = 0; i < projectsData.length; i++) {
    projectsData[i].rank = i + 1;
  }

  return projectsData;
};
