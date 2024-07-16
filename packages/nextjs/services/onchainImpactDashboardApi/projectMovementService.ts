import { IProjectMovement } from "../mongodb/models/projectMovement";

export const ProjectMovementService = () => {
  const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/projectMovement`;

  const getProjectMovements = async () => {
    const response = await fetch(baseURL);
    const { data }: { data: IProjectMovement[] } = await response.json();
    return data;
  };

  return {
    getProjectMovements,
  };
};
