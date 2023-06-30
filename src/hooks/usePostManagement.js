import { useState, useEffect, useReducer } from "react";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
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

// <////Create the Post////>
export const useCreatePost = (docCollection) => {
  const [createResponse, createDispatch] = useReducer(
    insertReducer,
    initialState
  );

  const [createLoading, setCreateLoading] = useState(false);
  const [createCancelled, setCreateCancelled] = useState(false);

  const checkCancelBeforeDispatch = (cancelAction) => {
    if (!createCancelled) {
      createDispatch(cancelAction);
    }
  };

  const insertDocument = async (insertEvent) => {
    setCreateLoading(true);

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

      setCreateLoading(false);
    } catch (managementError) {
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: managementError.message,
      });

      setCreateLoading(false);
    }
  };

  useEffect(() => {
    return () => setCreateCancelled(true);
  }, []);

  return { insertDocument, createResponse, createLoading };
};
// <////Create the Post////>

// <////Delete the Post////>
export const useDeletePost = (docCollection) => {
  const [deleteResponse, deleteDispatch] = useReducer(
    insertReducer,
    initialState
  );

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteCancelled, setDeleteCancelled] = useState(false);

  const checkCancelBeforeDispatch = (cancelAction) => {
    if (!deleteCancelled) {
      deleteDispatch(cancelAction);
    }
  };

  const deleteDocument = async (id) => {
    setDeleteLoading(true);

    checkCancelBeforeDispatch({
      type: "LOADING",
    });

    try {
      const deletedDocument = await deleteDoc(doc(db, docCollection, id));

      checkCancelBeforeDispatch({
        type: "DELETED_DOC",
        payload: deletedDocument,
      });

      setDeleteLoading(false);
    } catch (managementError) {
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: managementError.message,
      });

      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    return () => setDeleteCancelled(true);
  }, []);

  return { deleteDocument, deleteResponse, deleteLoading };
};
// <////Delete the Post////>

// <////Edit the Post////>
export const useEditPost = (docCollection) => {
  const [editResponse, editDispatch] = useReducer(insertReducer, initialState);

  const [editLoading, setEditLoading] = useState(false);
  const [editCancelled, setEditCancelled] = useState(false);

  const checkCancelBeforeDispatch = (cancelAction) => {
    if (!editCancelled) {
      editDispatch(cancelAction);
    }
  };

  const editDocument = async (id, data) => {
    setEditLoading(true);

    checkCancelBeforeDispatch({
      type: "LOADING",
    });

    try {
      const documentReference = await doc(db, docCollection, id);

      const updatedDocument = await updateDoc(documentReference, data);

      checkCancelBeforeDispatch({
        type: "UPDATED_DOC",
        payload: updatedDocument,
      });

      setEditLoading(false);
    } catch (managementError) {
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: managementError.message,
      });

      setEditLoading(false);
    }
  };

  useEffect(() => {
    return () => setEditCancelled(true);
  }, []);

  return { editDocument, editResponse, editLoading };
};
// <////Edit the Post////>
