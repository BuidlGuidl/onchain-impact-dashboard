import { addDocumentToCollection } from "./collections";
import { getFirestoreConnector } from "./firestoreDB";
import { ProjectTotalsRecord } from "./schema";

const firestoreDB = getFirestoreConnector();
const collectionName = "projectTotals";
const projectTotalsCollection = firestoreDB.collection("project-totals");
const projectTotalsDocs = () => projectTotalsCollection;

const projectTotalsFilteredById = (id: string) => projectTotalsCollection.doc(id);
export const getProjectTotalsDocs = () => projectTotalsDocs().get();
export const getProjectTotalsById = (id: string) => projectTotalsFilteredById(id).get();
export const addProjectTotalsDoc = (project: ProjectTotalsRecord) => addDocumentToCollection(collectionName, project);

export const createDateEntry = async (projectTotals: ProjectTotalsRecord) => {
  try {
    const timestamp = new Date().getTime();

    const ptdRef = await projectTotalsCollection.add({ ...projectTotals, createdAt: timestamp });
    const ptdSnapshot = await ptdRef.get();

    return { ...ptdSnapshot.data() } as ProjectTotalsRecord;
  } catch (error) {
    console.error("Error creating the grant:", error);
    throw error;
  }
};
