import { addDocumentToCollection } from "./collections";
import { getFirestoreConnector } from "./firestoreDB";
import { Metric } from "./schema";

const firestoreDB = getFirestoreConnector();
const collectionName = "metrics";
const getMetricDoc = (id: string) => firestoreDB.collection(collectionName).doc(id);
export const addMetricDoc = (metric: Metric) => addDocumentToCollection(collectionName, metric);

export const getMetricById = (id: string) => getMetricDoc(id).get();
