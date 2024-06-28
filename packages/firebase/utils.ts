import { Firestore } from "firebase-admin/firestore";
import { constants, copyFileSync, existsSync, readFileSync } from "fs";

type SeedData = {
  version: string;
  projects: Record<string, object>;
  metrics: Record<string, object>;
  "totals-by-date": Record<string, object>;
  "project-totals-by-date": Record<string, object>;
  "etl-log": Record<string, object>;
};

async function importCollectionData(
  database: Firestore,
  collectionName: string,
  data: Record<string, object>,
  ignoreId: boolean = false,
) {
  for (const [id, docData] of Object.entries(data)) {
    if (ignoreId) {
      await database.collection(collectionName).add(docData);
      continue;
    }
    await database.collection(collectionName).doc(id).set(docData);
  }
}

export const importSeed = async (database: Firestore) => {
  const SEED_PATH = "./seed.json";
  const SEED_EXAMPLE_PATH = "./seed.sample.json";

  const args = process.argv.slice(2);
  const flags = args.filter((arg) => arg.startsWith("--"));
  const isReset = flags.includes("--reset");

  const existingCollections = await database.listCollections();
  if (existingCollections.length > 0) {
    if (!isReset) {
      console.log("*** Local Firestore is not empty. Skipping seed import...");
      console.log("To reset the local Firestore, run `yarn seed --reset`");
      return;
    }
  }

  if (!existsSync(SEED_PATH)) {
    copyFileSync(SEED_EXAMPLE_PATH, SEED_PATH, constants.COPYFILE_EXCL);
  }

  const exampleSeed: SeedData = JSON.parse(
    readFileSync(SEED_EXAMPLE_PATH, "utf8"),
  );
  const currentSeed: SeedData = JSON.parse(readFileSync(SEED_PATH, "utf8"));

  const needsToUpdateDbVersion = exampleSeed.version !== currentSeed.version;
  if (needsToUpdateDbVersion) {
    console.log("New local db version: overwriting existing seed file");
    copyFileSync(SEED_EXAMPLE_PATH, SEED_PATH);
  }

  const seedToImport = needsToUpdateDbVersion ? exampleSeed : currentSeed;
  console.log("Importing seed to Firestore emulator....");

  await Promise.all([
    importCollectionData(database, "projects", seedToImport.projects),
    importCollectionData(database, "metrics", seedToImport.metrics),
    importCollectionData(database, "totals-by-date", seedToImport["totals-by-date"]),
    importCollectionData(database, "project-totals-by-date", seedToImport["project-totals-by-date"]),
    importCollectionData(database, "etl-log", seedToImport["etl-log"]),
  ]);

  console.log("Seed completed successfully! 🌱");
};
