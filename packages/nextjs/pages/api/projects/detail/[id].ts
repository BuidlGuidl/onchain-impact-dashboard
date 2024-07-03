import { convertProjectToDto } from "..";
import type { NextApiRequest, NextApiResponse } from "next";
import { getProjectById } from "~~/services/database/projects";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  const id = req.query.id as string | undefined;
  if (!id) return res.status(400).json({ message: "Must include project ID" });
  try {
    const projectDetail = await getProjectById(id);
    const projectDetailDto = convertProjectToDto(projectDetail);
    res.status(200).json(projectDetailDto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
