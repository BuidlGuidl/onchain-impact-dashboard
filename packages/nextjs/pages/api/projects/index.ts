import type { NextApiRequest, NextApiResponse } from "next";
import { Project } from "~~/app/types/data";
import { getProjects } from "~~/services/database/projects";

type ProjectDto = Pick<
  Project,
  "id" | "name" | "profileAvatarUrl" | "description" | "socialLinks" | "proejctCoverImageUrl"
>;

export const convertProjectToDto = ({
  id,
  proejctCoverImageUrl,
  name,
  profileAvatarUrl,
  description,
  socialLinks,
}: Project): ProjectDto => ({
  id,
  proejctCoverImageUrl,
  name,
  profileAvatarUrl,
  description,
  socialLinks,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  try {
    const projects = await getProjects();
    const projectDtos = projects.map(convertProjectToDto);
    res.status(200).json(projectDtos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
