import projectsJSON from "./projects.json";
import type { NextApiRequest, NextApiResponse } from "next";
import { Project } from "~~/services/database/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  const projects = projectsJSON as Project[];
  // check if id param is present
  const { limit = "10", offset = "0" } = req.query;
  const parseLimit: number = parseInt(limit as string);
  const parsedOffset: number = parseInt(offset as string);
  try {
    if (parseLimit && parseLimit > 100) {
      return res.status(500).json({
        code: "custom",
        message: "Invalid input",
        path: [],
      });
    }
    const paginatedProjects = projects.slice(parsedOffset, Math.min(parsedOffset + parseLimit, projects.length));
    const hasNext = projects.length > parsedOffset + parseLimit;
    const response = {
      meta: {
        has_next: hasNext,
        total_returned: paginatedProjects.length,
        next_offset: hasNext ? parsedOffset + parseLimit : 0,
      },
      data: paginatedProjects,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
