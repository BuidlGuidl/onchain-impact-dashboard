import seriesJSON from "./series.json";
import type { NextApiRequest, NextApiResponse } from "next";
import { RF4ImpactMetricsByProject } from "~~/app/types/OSO";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  const series = seriesJSON as { [key: string]: RF4ImpactMetricsByProject[] };
  // check if date params are present
  let { date = new Date().toUTCString() } = req.query;

  if (date && typeof date === "string") {
    date = new Date(date).toISOString().split("T")[0];
  }

  try {
    const data = series[date as string] || [];
    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
