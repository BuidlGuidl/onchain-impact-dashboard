import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~~/services/mongodb/dbConnect";
import ProjectScore from "~~/services/mongodb/models/projectScore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  const id = req.query.id as string | undefined;
  if (!id) return res.status(400).json({ message: "Must include valid project ID" });

  const entries = await ProjectScore.find({ projectId: id });

  if (!entries || entries.length === 0) {
    return res.status(404).json({ message: "No scores located with that project id" });
  }

  try {
    res.status(200).json({ data: entries });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
