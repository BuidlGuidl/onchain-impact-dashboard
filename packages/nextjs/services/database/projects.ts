import { addDocumentToCollection } from "./collections";
import { getFirestoreConnector } from "./firestoreDB";
import { Project } from "./schema";

const firestoreDB = getFirestoreConnector();
const collectionName = "projects";
const getProjectDoc = (id: string) => firestoreDB.collection(collectionName).doc(id);
export const getProjectById = (id: string) => getProjectDoc(id).get();
export const addProjectDoc = (project: Project) => addDocumentToCollection(collectionName, project);

export const getProjectIds = async () => {
  const snapshot = await firestoreDB.collection(collectionName).get();
  const ids = snapshot.docs.map(doc => doc.id);
  return ids;
};
