import { QuerySnapshot } from "firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { getGlobalScoreFilteredDate } from "~~/services/database/globalScore";
import { GlobalScoreDay } from "~~/services/database/schema";

export interface GlobalScoreDTO {
  [key: string]: string | number;
}

const getTargetDate = (date: Date, filter: string) => {
  date.setDate(date.getDate() - parseInt(filter));
  const month = date.getUTCMonth() + 1;
  const stringMonth = month > 10 ? `${month}` : `0${month}`;
  const day = date.getUTCDate();
  const stringDay = day > 10 ? `${day}` : `0${day}`;
  const year = date.getUTCFullYear();
  return `${year}${stringMonth}${stringDay}`;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  let limit = "20240110";
  const filter = req.query.filter as string | undefined;
  let querySnapshot: QuerySnapshot | null = null;
  if (!!filter) {
    limit = getTargetDate(new Date("2024-01-10"), filter);
  }

  querySnapshot = await getGlobalScoreFilteredDate(limit);
  if (!querySnapshot) {
    return res.status(404).json({ message: "No data" });
  }
  const staticScores = querySnapshot.docs.map(doc => doc.data()) as GlobalScoreDay[];
  const scores: GlobalScoreDTO[] = staticScores.map(item => {
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
