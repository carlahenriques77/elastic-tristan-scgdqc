import { useState, useEffect } from "react";
import { db } from "..";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where
} from "firebase/firestore";

export const useFetchCollection = (
  docCollection,
  search = null,
  uid = null
) => {
  const [fetchedDocuments, setFetchedDocuments] = useState(null);
  const [fetchLoadingStatus, setFetchLoadingStatus] = useState(null);
  const [fetchErrorState, setFetchErrorState] = useState(null);

  const [isFetchCancelled, setFetchCancelledStatus] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (isFetchCancelled) {
        return;
      }

      setFetchLoadingStatus(true);

      const collectionRef = await collection(db, docCollection);

      try {
        let documentQuery;

        if (search) {
          const searchLower = search.toLowerCase();
          documentQuery = await query(
            collectionRef,
            where("tagsArray", "array-contains", searchLower),
            orderBy("createdAt", "desc")
          );
        } else if (uid) {
          documentQuery = await query(
            collectionRef,

            where("uid", "==", uid),
            orderBy("createdAt", "desc")
          );
          // Delete this Whole Else If to get Edit Acess to All Posts
        } else {
          documentQuery = await query(
            collectionRef,

            orderBy("createdAt", "desc")
          );
        }

        await onSnapshot(documentQuery, (querySnapshot) => {
          setFetchedDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }))
          );
        });

        setFetchLoadingStatus(false);
      } catch (fetchErrorState) {
        setFetchErrorState(fetchErrorState.message);

        setFetchLoadingStatus(false);
      }
    }

    loadData();
  }, [docCollection, fetchedDocuments, search, uid, isFetchCancelled]);

  useEffect(() => {
    return () => {
      setFetchCancelledStatus(true);
    };
  }, []);

  return {
    fetchedDocuments,
    fetchLoadingStatus,
    fetchErrorState
  };
};
