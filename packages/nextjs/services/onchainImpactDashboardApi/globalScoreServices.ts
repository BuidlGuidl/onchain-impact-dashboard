import { GlobalScoreDTO } from "~~/pages/api/stub/globalScore";

export const GlobalScoreService = () => {
  const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/stub/globalScore`;
  const getPaginatedGlobalScores = async (filter?: string) => {
    let url = `${baseURL}`;
    url += `?filter=${filter}`;
    const response = await fetch(url);
    const { data }: { data: GlobalScoreDTO[] } = await response.json();
    return data;
  };
  return { getPaginatedGlobalScores };
};
