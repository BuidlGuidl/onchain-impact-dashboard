import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~~/services/mongodb/dbConnect";
import ProjectMovement from "~~/services/mongodb/models/projectMovement";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  const projectMovements = await ProjectMovement.find({});

  if (!projectMovements || projectMovements.length === 0) {
    return res.status(404).json({ message: "No movements found" });
  }

  try {
    res.status(200).json({ data: projectMovements });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
