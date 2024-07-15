import { IProject } from "../mongodb/models/project";

export const ProjectService = () => {
  const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/projects`;
  const getProjects = async () => {
    const response = await fetch(`${baseURL}`);
    const data = await response.json();
    return data.data as IProject[];
  };

  const getProjectById = async (id: string) => {
    const response = await fetch(`${baseURL}?id=${id}`);
    const { data }: { data: IProject } = await response.json();
    return data;
  };

  const getProjectIds = async () => {
    const response = await fetch(`${baseURL}/ids`);
    const data: string[] = await response.json();
    return data;
  };

  return {
    getProjects,
    getProjectById,
    getProjectIds,
  };
};
