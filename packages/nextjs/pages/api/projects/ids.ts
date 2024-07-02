import projectsJSON from "../stub/projects/projects.json";
import type { NextApiRequest, NextApiResponse } from "next";
import { Project } from "~~/services/database/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  try {
    const projects = projectsJSON as Project[];
    const ids = projects.map(({ id }) => id);
    res.status(200).json(ids);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
