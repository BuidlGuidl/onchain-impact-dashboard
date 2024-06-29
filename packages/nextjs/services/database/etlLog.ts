import { addDocumentToCollection, upsertDocumentInCollection } from "./collections";
import { getFirestoreConnector } from "./firestoreDB";
import { ETLLog } from "./schema";

const firestoreDB = getFirestoreConnector();
const collectionName = "etl-log";
const getETLLogDoc = (date: string) => firestoreDB.collection(collectionName).doc(date);
export const addETLLogDoc = (etlLog: ETLLog) => addDocumentToCollection(collectionName, etlLog);
export const setETLLogDoc = (date: string, etlLog: ETLLog) => upsertDocumentInCollection(collectionName, date, etlLog);

export const getETLLogByDate = (date: string) => getETLLogDoc(date).get();
