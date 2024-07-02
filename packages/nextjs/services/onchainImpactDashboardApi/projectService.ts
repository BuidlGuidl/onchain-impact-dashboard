import { Project } from "../database/schema";

export const ProjectService = () => {
  const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/stub/projects`;
  const getPaginatedProjects = async () => {
    const response = await fetch(`${baseURL}?limit=100`);
    const data = await response.json();
    return data.data as Project[];
  };

  const getProjectById = async (id: string) => {
    const response = await fetch(`${baseURL}?id=${id}`);
    const { data }: { data: Project } = await response.json();
    return data;
  };

  return {
    getPaginatedProjects,
    getProjectById,
  };
};
