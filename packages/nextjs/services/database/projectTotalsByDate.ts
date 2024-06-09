import { getFirestoreConnector } from "./firestoreDB";
import { ProjectTotalsByDate } from "./schema";

const firestoreDB = getFirestoreConnector();
const projectTotalsByDateCollection = firestoreDB.collection("project-totals-by-date");
const getProjectTotalsByDateDoc = (id: string) => projectTotalsByDateCollection.doc(id);
export const getProjectTotalsByDateById = (id: string) => getProjectTotalsByDateDoc(id).get();

export const createDateEntry = async (projectTotalsByDate: ProjectTotalsByDate) => {
  try {
    const timestamp = new Date().getTime();

    const ptdRef = await projectTotalsByDateCollection.add({ ...projectTotalsByDate, createdAt: timestamp });
    const ptdSnapshot = await ptdRef.get();

    return { ...ptdSnapshot.data() } as ProjectTotalsByDate;
  } catch (error) {
    console.error("Error creating the grant:", error);
    throw error;
  }
};
