import { ProjectTotalsRecord } from "../database/schema";

export const ProjectTotalsService = () => {
  const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/totals`;
  const getPaginatedProjectTotals = async () => {
    const response = await fetch(`${baseURL}?limit=100`);
    const data = await response.json();
    return data.data as ProjectTotalsRecord[];
  };

  const getProjectTotalsById = async (id: string) => {
    const response = await fetch(`${baseURL}/${id}`);
    const { data }: { data: ProjectTotalsRecord } = await response.json();
    return data;
  };

  const getProjectTotalsByIdAndFilters = async (id: string, filter: string) => {
    let url = `${baseURL}/${id}`;
    url += `?filter=${filter}`;
    const response = await fetch(url);
    const { data }: { data: ProjectTotalsRecord } = await response.json();
    return data;
  };

  return {
    getPaginatedProjectTotals,
    getProjectTotalsByIdAndFilters,
    getProjectTotalsById,
  };
};
