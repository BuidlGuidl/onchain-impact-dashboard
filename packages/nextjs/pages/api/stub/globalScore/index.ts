import { QuerySnapshot } from "firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { getGlobalScoreDocs } from "~~/services/database/globalScore";
import { GlobalScoreDay } from "~~/services/database/schema";

export interface GlobalScoreDTO {
  [key: string]: string | number;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  let limit = "";
  const { filter } = req.query;
  if (filter == "last-week") {
    const dateObj = new Date("2024-01-10");
    dateObj.setDate(dateObj.getDate() - 3);
    const month = dateObj.getUTCMonth() + 1;
    const stringMonth = month > 10 ? `${month}` : `0${month}`;
    const day = dateObj.getUTCDate();
    const stringDay = day > 10 ? `${day}` : `0${day}`;
    const year = dateObj.getUTCFullYear();
    limit = `${year}${stringMonth}${stringDay}`;
    console.log(limit);
  }

  const querySnapshot: QuerySnapshot = await getGlobalScoreDocs();
  const staticScores = querySnapshot.docs.map(doc => doc.data()) as GlobalScoreDay[];
  const scores = staticScores
    .filter(value => limit == "" || value.createdAt < limit)
    .map(item => {
      const eachScore: GlobalScoreDTO = {};
      item.projects.forEach(proj => {
        eachScore[proj.name] = proj.overallScore;
      });
      return {
        date: item.createdAt,
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
