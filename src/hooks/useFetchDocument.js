import { useState, useEffect } from "react";
import { db } from "..";
import {
    doc,
    getDoc
} from "firebase/firestore";

export const useFetchDocument = (
  docCollection,
  id
) => {
  const [postDocument, setPostDocument] = useState(null);
  const [postLoadingStatus, setPostLoadingStatus] = useState(null);
  const [postErrorState, setPostErrorState] = useState(null);

  const [isPostCancelled, setPostCancelledStatus] = useState(false);

  useEffect(() => {
    async function loadDocument() {
      if (isPostCancelled) {
        return;
      }

      setPostLoadingStatus(true);

      try {

        const docRef = await doc(db, docCollection, id)
        const docSnap = await getDoc(docRef)

        setPostDocument(docSnap.data())
        
        setPostLoadingStatus(false);
      } catch (postErrorState) {

        setPostErrorState(postErrorState.message)
        
        setPostLoadingStatus(false);
      }
    }

    loadDocument();
  }, [docCollection, id, isPostCancelled]);

  useEffect(() => {
    return () => {
      setPostCancelledStatus(true);
    };
  }, []);

  return {
    postDocument,
    postLoadingStatus,
    postErrorState
  };
};
