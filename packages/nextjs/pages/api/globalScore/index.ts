import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~~/services/mongodb/dbConnect";
import GlobalScore, { IGlobalScore } from "~~/services/mongodb/models/globalScore";
import { MetricNames } from "~~/services/mongodb/models/metric";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  const projection = req.query.projection as string | undefined;
  // Get the start and end date from query params
  const startDate = req.query.startDate as string | undefined;
  const endDate = req.query.endDate as string | undefined;
  // Defaults to 90 days
  let start = new Date();
  start.setDate(start.getDate() - 90);
  let end = new Date();
  if (startDate) {
    if (isNaN(new Date(startDate).getTime())) {
      return res.status(400).json({ message: "Invalid start date." });
    }
    start = new Date(startDate);
  }

  if (endDate) {
    if (isNaN(new Date(endDate).getTime())) {
      return res.status(400).json({ message: "Invalid end date." });
    }
    end = new Date(endDate);
  }
  const projectionObj: mongoose.ProjectionType<IGlobalScore> = { date: 1 };
  const props = projection ? projection.split(",") : Object.keys(MetricNames); // "index_impact,gas_fees" >> ["index_impact", "gas_fees"]
  for (const prop of props) {
    projectionObj[prop as keyof IGlobalScore] = 1;
  }
  const entries = await GlobalScore.findBetweenDates(start, end, projectionObj);

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
