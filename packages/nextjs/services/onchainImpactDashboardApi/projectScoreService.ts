import { IProjectScore } from "../mongodb/models/projectScore";

export const ProjectScoreService = () => {
  const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/projectScore`;
  const getProjectScoreById = async (id: string) => {
    const response = await fetch(`${baseURL}/${id}`);
    const { data }: { data: IProjectScore[] } = await response.json();
    return data;
  };

  return {
    getProjectScoreById,
  };
};
