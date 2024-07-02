import type { NextApiRequest, NextApiResponse } from "next";
import { getProjectTotalsById } from "~~/services/database/projectTotals";
import { ProjectTotalsRecord } from "~~/services/database/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  const id = req.query.id as string | undefined;

  const querySnapshot = await getProjectTotalsById(id!);

  if (!querySnapshot) {
    return res.status(404).json({ message: "No data" });
  }
  const totals = querySnapshot.data() as ProjectTotalsRecord;

  try {
    res.status(200).json({ data: totals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
