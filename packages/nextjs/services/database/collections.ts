// Just to test Firebase Functions.
import { firestore } from "firebase-admin";
import { getFirestoreConnector } from "~~/services/database/firestoreDB";

import CollectionReference = firestore.CollectionReference;

const listCollections = async () => {
  const firestoreDB = getFirestoreConnector();
  let collections: CollectionReference[] = [];

  try {
    collections = await firestoreDB.listCollections();
  } catch (error) {
    console.error("Error listing collections:", error);
  }

  return collections;
};

const addDocumentToCollection = async (collectionName: string, data: any) => {
  const firestoreDB = getFirestoreConnector();

  try {
    // @notice Add a new document with a generated ID to the specified collection
    // @dev Creates the collection if it doesn't already exist.
    const docRef = await firestoreDB.collection(collectionName).add(data);
    console.log("DocumentID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

const upsertDocumentInCollection = async (collectionName: string, docName: string, data: any) => {
  const firestoreDB = getFirestoreConnector();

  try {
    // @notice Add a new document with a specified ID to the specified collection
    // @dev Creates the collection if it doesn't already exist.
    await firestoreDB.collection(collectionName).doc(docName).set(data);
    console.log("DocumentID: ", docName);
    return docName;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

export { listCollections, addDocumentToCollection, upsertDocumentInCollection };
