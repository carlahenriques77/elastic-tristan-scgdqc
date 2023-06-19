import { useState, useEffect, useReducer } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "..";

const initialState = {
  managementLoading: null,
  managementError: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { managementLoading: true, managementError: null };
    case "INSERTED_DOC":
      return { managementLoading: false, managementError: null };
    case "DELETED_DOC":
      return { managementLoading: false, managementError: null };
    case "ERROR":
      return { managementLoading: false, managementError: action.payload };
    default:
      return state;
  }
};

export const useCreatePost = (docCollection) => {
  const [createResponse, createDispatch] = useReducer(
    insertReducer,
    initialState
  );

  const [createLoading, setCreateLoading] = useState(false)
  const [createCancelled, setCreateCancelled] = useState(false);

  const checkCancelBeforeDispatch = (cancelAction) => {
    if (!createCancelled) {
      createDispatch(cancelAction);
    }
  };

  const insertDocument = async (insertEvent) => {
    setCreateLoading(true)

    checkCancelBeforeDispatch({
      type: "LOADING",
    });

    try {
      const newDocument = { ...insertEvent, createdAt: Timestamp.now() };

      const insertedDocument = await addDoc(
        collection(db, docCollection),
        newDocument
      );

      checkCancelBeforeDispatch({
        type: "INSERTED_DOC",
        payload: insertedDocument,
      });

      setCreateLoading(false)
    } catch (managementError) {
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: managementError.message,
      });

      setCreateLoading(false)
    }
  };

  useEffect(() => {
    return () => setCreateCancelled(true)
  }, [])

  return {insertDocument, createResponse, createLoading}
};
