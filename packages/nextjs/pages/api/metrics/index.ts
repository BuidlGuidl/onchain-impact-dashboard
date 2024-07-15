import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~~/services/mongodb/dbConnect";
import Metric from "~~/services/mongodb/models/metric";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  const entries = await Metric.findAllActivated();

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
