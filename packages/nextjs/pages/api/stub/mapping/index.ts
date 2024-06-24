import mappingsJSON from "./mappings.json";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  const mapping = mappingsJSON as { [key: string]: string };
  // check if id param is present
  const { id } = req.query;
  try {
    if (id && typeof id === "string") {
      if (!mapping[id]) {
        return res.status(404).json({ message: "Mapping not found. Make sure you are URL encoding the id" });
      }
      // return single mapping
      return res.status(200).json({ mapping: { [id]: mapping[id] } });
    } else {
      // return all mappings
      res.status(200).json({ mapping });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
