import { IMetric } from "../mongodb/models/metric";

export const MetricService = () => {
  const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/metrics`;
  const getMetrics = async () => {
    const response = await fetch(`${baseURL}`);
    const data = await response.json();
    return data.data as IMetric[];
  };

  return {
    getMetrics,
  };
};
