import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  // Accept Date params for ease of backfilling

  // Check if process is running/already run for today
  // If not, run process - set process as 'running' in DB

  // Get data from OSO
  // Save raw response to DB (so that we can recreate data if needed)

  // Get Agora Data
  // Check for new projects inside the returned data

  // Run ETL process without awaiting

  // Go ahead and return success message or already running/already run message
  try {
    if (true) {
      res.status(200).json({ message: "ETL process started for dd/mm/yyyy" });
    } else {
      res.status(404).json({ message: "Vectors not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
