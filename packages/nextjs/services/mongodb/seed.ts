import dbConnect from "./dbConnect";
import Metric from "./models/metric";
import Project from "./models/project";
import seedData from "./seed.sample.json";
import mongoose from "mongoose";

const args = process.argv.slice(2);
const flags = args.filter(arg => arg.startsWith("--"));
const isReset = flags.includes("--reset");

const seedDb = async () => {
  await dbConnect();
  const collectionsToSeed = [Project, Metric];
  for await (const collection of collectionsToSeed) {
    if (isReset) {
      await (collection as mongoose.Model<any>).deleteMany({});
    }
    const numDocs = await collection.countDocuments();
    const collectionExists = numDocs > 0;
    if (!collectionExists || isReset) {
      console.log(`Seeding db with ${collection.modelName} data...`);
      const result = await (collection as mongoose.Model<any>).insertMany(
        seedData[collection.modelName.toLowerCase() as keyof typeof seedData],
      );
      console.log(`${result.length} documents inserted.`);
    } else {
      console.log(`${collection.modelName} already exists. Skipping seeding.`);
    }
  }
  console.log("Seeding complete.");
  process.exit();
};

seedDb();
