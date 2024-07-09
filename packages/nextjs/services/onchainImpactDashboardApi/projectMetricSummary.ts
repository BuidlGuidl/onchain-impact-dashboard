import { IProjectMetricSummary } from "../mongodb/models/projectMetricSummary";

export const ProjectMetricSummaryService = () => {
  const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/projectScore`;

  const getProjectMetricSummary = async (metricName: string) => {
    const response = await fetch(`${baseURL}?metricName=${metricName}`);
    const { data }: { data: IProjectMetricSummary[] } = await response.json();
    return data;
  };

  return {
    getProjectMetricSummary,
  };
};
