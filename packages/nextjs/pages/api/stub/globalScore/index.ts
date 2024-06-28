import globalScore from "./global-score.json";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  const scores = Object.entries(globalScore).map(item => {
    const projects: any = {};
    item[1].projects.forEach(proj => {
      projects[proj.name] = proj.overallScore;
    });
    return {
      date: item[0],
      ...projects,
    };
  });

  // check if id param is present
  try {
    res.status(200).json(scores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
