import { getFirestoreConnector } from "./firestoreDB";

const firestoreDB = getFirestoreConnector();
const getMetricDoc = (id: string) => firestoreDB.collection("metrics").doc(id);
export const getMetricById = (id: string) => getMetricDoc(id).get();
