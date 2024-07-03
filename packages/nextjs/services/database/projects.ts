import { addDocumentToCollection } from "./collections";
import { getFirestoreConnector } from "./firestoreDB";
import { Project } from "./schema";

const firestoreDB = getFirestoreConnector();
const collectionName = "projects";
const getProjectDoc = (id: string) => firestoreDB.collection(collectionName).doc(id);
const getProjectsSnapshot = () => firestoreDB.collection(collectionName).get();
export const addProjectDoc = (project: Project) => addDocumentToCollection(collectionName, project);

export const getProjectIds = async () => {
  const snapshot = await firestoreDB.collection(collectionName).get();
  const ids = snapshot.docs.map(doc => doc.id);
  return ids;
};

export const getProjectById = async (id: string) => {
  const snapshot = await getProjectDoc(id).get();
  return { id: snapshot.id, ...snapshot.data() } as Project;
};

export const getProjects = async () => {
  const snapshot = await getProjectsSnapshot();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
};
