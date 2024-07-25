import { IGlobalScore } from "../mongodb/models/globalScore";

export const GlobalScoreService = () => {
  const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/globalScore`;
  const getGlobalScores = async (filter?: string) => {
    let url = `${baseURL}`;
    let startDate = new Date();
    let endDate = new Date();
    if (filter) {
      if (filter.includes(",")) {
        const [start, end] = filter.split(",");
        startDate = new Date(start);
        endDate = new Date(end);
      } else if (typeof parseInt(filter) === "number") {
        startDate.setDate(startDate.getDate() - parseInt(filter));
      }
      url += `?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    }
    const response = await fetch(url);
    const { data }: { data: IGlobalScore[] } = await response.json();
    return data;
  };
  return { getGlobalScores };
};
