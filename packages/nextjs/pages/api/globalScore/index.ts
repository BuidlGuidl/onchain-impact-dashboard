import { QuerySnapshot } from "firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { getGlobalScoreFiltered, getGlobalScoreFilteredDate } from "~~/services/database/globalScore";
import { GlobalScoreDay } from "~~/services/database/schema";
import { getTargetDate } from "~~/utils/onchainImpactDashboard/common";

export interface GlobalScoreDTO {
  date: string;
  globalScore: string;
}
const toDTO = (entity: GlobalScoreDay): GlobalScoreDTO => {
  return {
    date: entity.createdAt,
    globalScore: entity.metrics[0].value,
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  let limit = ["20240309"];
  const filter = req.query.filter as string | undefined;
  let querySnapshot: QuerySnapshot | null = null;
  if (!!filter) {
    limit = getTargetDate(new Date("2024-03-09"), filter);
  }

  querySnapshot =
    limit.length > 1 ? await getGlobalScoreFiltered([limit[0], limit[1]]) : await getGlobalScoreFilteredDate(limit[0]);

  if (!querySnapshot) {
    return res.status(404).json({ message: "No data" });
  }
  const staticScores = querySnapshot.docs.map(doc => doc.data()) as GlobalScoreDay[];
  const scoresDto: GlobalScoreDTO[] = staticScores.map(item => toDTO(item));

  try {
    res.status(200).json({ data: scoresDto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
