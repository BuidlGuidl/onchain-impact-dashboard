import { AgoraApiResponse } from "~~/app/types/data";

export const fetchProjectMetadata = async () => {
  const endpoint = process.env.AGORA_API_ENDPOINT;
  const apiKey = process.env.AGORA_API_KEY;
  if (!endpoint) throw new Error("AGORA_API_ENDPOINT env var is not defined");
  if (!apiKey) throw new Error("AGORA_API_KEY env var is not defined");

  const options = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };
  const response = await fetch(`${endpoint}/projects`, options);
  const data: AgoraApiResponse = await response.json();
  return data;
};
