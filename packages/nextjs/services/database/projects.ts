import { getFirestoreConnector } from "./firestoreDB";

const firestoreDB = getFirestoreConnector();
const getProjectDoc = (id: string) => firestoreDB.collection("projects").doc(id);
export const getProjectById = (id: string) => getProjectDoc(id).get();
