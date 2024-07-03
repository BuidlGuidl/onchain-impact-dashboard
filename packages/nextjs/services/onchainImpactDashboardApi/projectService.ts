import { Project } from "../database/schema";

export const ProjectService = () => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const getPaginatedProjects = async () => {
    const response = await fetch(`${baseURL}/projects`);
    const allProjects = await response.json();
    return allProjects as Project[];
  };

  const getProjectById = async (id: string) => {
    const response = await fetch(`${baseURL}/projects/detail/${id}`);
    const project: Project = await response.json();
    return project;
  };

  const getProjectIds = async () => {
    const response = await fetch(`${baseURL}/projects/ids`);
    const data: string[] = await response.json();
    return data;
  };

  return {
    getPaginatedProjects,
    getProjectById,
    getProjectIds,
  };
};
