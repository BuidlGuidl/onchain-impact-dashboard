import globalScore from "./global-score.json";
import type { NextApiRequest, NextApiResponse } from "next";
import { GlobalScores } from "~~/services/database/schema";

export interface GlobalScoreDTO {
  [key: string]: string | number;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  const staticScores = globalScore as GlobalScores;

  const scores = Object.entries(staticScores).map(item => {
    const eachScore: GlobalScoreDTO = {};
    item[1].projects.forEach(proj => {
      eachScore[proj.name] = proj.overallScore;
    });
    return {
      date: item[0],
      ...eachScore,
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
