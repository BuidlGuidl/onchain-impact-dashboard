import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~~/services/mongodb/dbConnect";
import Project, { IProject } from "~~/services/mongodb/models/project";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  try {
    await dbConnect();
    const entries = await Project.find({});
    const ids = entries.map((entry: IProject) => entry.id);
    res.status(200).json(ids);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
