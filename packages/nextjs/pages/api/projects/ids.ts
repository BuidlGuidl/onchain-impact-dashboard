import type { NextApiRequest, NextApiResponse } from "next";
import { getProjectIds } from "~~/services/database/projects";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  try {
    const ids = await getProjectIds();
    res.status(200).json(ids);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
