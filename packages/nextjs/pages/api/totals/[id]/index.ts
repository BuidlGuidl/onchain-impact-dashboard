import { DocumentSnapshot } from "firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { getProjectTotalsById } from "~~/services/database/projectTotals";
import { ProjectTotalsRecord } from "~~/services/database/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  const id = "0x000000000000007f2a005d9c88cc001b5b9ec4afb8b300023cb8abc11b946000";

  const querySnapshot: DocumentSnapshot | null = await getProjectTotalsById(id);

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
