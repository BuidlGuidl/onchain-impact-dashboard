import { IGlobalScore } from "../mongodb/models/globalScore";

export const GlobalScoreService = () => {
  const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/globalScore`;
  const getGlobalScores = async (filter?: string) => {
    let url = `${baseURL}`;
    if (filter) {
      if (filter.includes(",")) {
        const [start, end] = filter.split(",");
        url += `?startDate=${start}&endDate=${end}`;
      } else if (typeof parseInt(filter) === "number") {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - parseInt(filter));
        const endDate = new Date();
        url += `?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
      }
    }
    const response = await fetch(url);
    const { data }: { data: IGlobalScore[] } = await response.json();
    return data;
  };
  return { getGlobalScores };
};
