import projectsJSON from "./projects.json";
import type { NextApiRequest, NextApiResponse } from "next";
import { Project } from "~~/services/database/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  const projects = projectsJSON as Project[];
  // check if id param is present
  const { id } = req.query;

  try {
    if (id) {
      const project = projects.find(project => project.attestationUid === id);
      if (!project) {
        return res.status(404).json({ message: "Project not found. Make sure you are URL encoding the id" });
      }
      return res.status(200).json(project);
    }
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
