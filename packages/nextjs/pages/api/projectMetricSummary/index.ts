import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~~/services/mongodb/dbConnect";
import ProjectMetricSummary from "~~/services/mongodb/models/projectMetricSummary";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  const metricName = req.query.metricName as string;
  if (!metricName) return res.status(400).json({ message: "Missing metricName" });

  const entries = await ProjectMetricSummary.find({ metricName });

  if (!entries) {
    return res.status(404).json({ message: "No data" });
  }

  try {
    res.status(200).json({ data: entries });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
