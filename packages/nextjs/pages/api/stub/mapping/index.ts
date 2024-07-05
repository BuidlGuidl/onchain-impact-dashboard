import mappingsJSON from "./staticMapping.json";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  const mapping = mappingsJSON as {
    application_id: string;
    oso_name: string;
    project_name: string;
    is_approved: string;
  }[];
  // check if id param is present
  const { id } = req.query;
  try {
    if (id && typeof id === "string") {
      const entry = mapping.find(m => m.application_id === id || m.oso_name === id);
      if (!entry) {
        return res.status(404).json({ message: "Mapping not found. Make sure you are URL encoding the id" });
      }
      // return single mapping
      return res.status(200).json({ mapping: { [id]: entry } });
    } else {
      // return all mappings
      res.status(200).json({ mapping });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
