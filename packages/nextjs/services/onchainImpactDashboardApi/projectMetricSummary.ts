import { IProjectMovement } from "../mongodb/models/projectMovement";

export const ProjectMetricSummaryService = () => {
  const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/projectScore`;

  const getProjectMetricSummary = async (metricName: string) => {
    const response = await fetch(`${baseURL}?metricName=${metricName}`);
    const { data }: { data: IProjectMovement[] } = await response.json();
    return data;
  };

  return {
    getProjectMetricSummary,
  };
};
