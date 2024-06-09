import { getFirestoreConnector } from "./firestoreDB";

const firestoreDB = getFirestoreConnector();
const getTotalsByDateDoc = (id: string) => firestoreDB.collection("totals-by-date").doc(id);
export const getTotalsByDateById = (id: string) => getTotalsByDateDoc(id).get();
