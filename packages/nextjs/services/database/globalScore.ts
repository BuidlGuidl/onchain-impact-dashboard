import { addDocumentToCollection } from "./collections";
import { getFirestoreConnector } from "./firestoreDB";
import { GlobalScoreDay } from "./schema";

const firestoreDB = getFirestoreConnector();
const collectionName = "globalScore";
const globalScoreDoc = (id: string) => firestoreDB.collection(collectionName).doc(id);
const globalScoreDocs = () => firestoreDB.collection(collectionName);

const globalScoreFilteredByIds = (ids: string[]) => {
  const query = firestoreDB.collection(collectionName).where(
    "__name__",
    "in",
    ids.map(id => `${collectionName}/${id}`),
  );
  return query;
};
export const getGlobalScoreFilteredByIds = (ids: string[]) => globalScoreFilteredByIds(ids).get();
export const getGlobalScoreDocs = () => globalScoreDocs().get();
export const getGlobalScoreById = (id: string) => globalScoreDoc(id).get();
export const addGlobalScoreDoc = (project: GlobalScoreDay) => addDocumentToCollection(collectionName, project);
