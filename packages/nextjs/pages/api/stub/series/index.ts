import seriesJSON from "./series.json";
import type { NextApiRequest, NextApiResponse } from "next";
import { OnchainMetricsByProject } from "~~/app/types/OSO";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  const series = seriesJSON as { [key: string]: OnchainMetricsByProject[] };
  // check if date params are present
  let { startDate, endDate } = req.query;
  if (startDate && typeof startDate === "string") {
    console.log("startDate", startDate);
    startDate = new Date(startDate).toISOString().split("T")[0];
  }
  if (endDate && typeof endDate === "string") {
    endDate = new Date(endDate).toISOString().split("T")[0];
  }

  try {
    if (startDate || endDate) {
      const filteredSeries: { [key: string]: OnchainMetricsByProject[] } = {};
      for (const key in series) {
        const itemDate = new Date(key);
        if (startDate && endDate) {
          if (itemDate >= new Date(startDate as string) && itemDate <= new Date(endDate as string)) {
            filteredSeries[key] = series[key];
          }
        } else if (startDate) {
          if (itemDate >= new Date(startDate as string)) {
            filteredSeries[key] = series[key];
          }
        } else {
          filteredSeries[key] = series[key];
        }
      }

      if (Object.keys(filteredSeries).length === 0) {
        return res.status(404).json({ message: "No series found within the specified date range." });
      }

      // return filtered series
      res.status(200).json({ series: filteredSeries });
    } else {
      // return all series
      res.status(200).json({ series });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
