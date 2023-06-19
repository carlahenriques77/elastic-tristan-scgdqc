import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [authError, setAuthError] = useState(null);
  const [authLoading, setAuthLoading] = useState(null);

  const [authCancelled, setAuthCancelled] = useState(false);

  const authHandler = getAuth();

  function checkIfIsCancelled() {
    if (authCancelled) {
      return;
    }
  }

  function handleAuthError(formError) {
    let formErrorMessage;

    if (formError.message.includes("Password")) {
      formErrorMessage = "The Password must Contain at least 6 Characters.";
    } else if (formError.message.includes("email-already")) {
      formErrorMessage = "Email already in use.";
    } else if (formError.message.includes("getIdToken")) {
      formErrorMessage = "Token Error lol";
    } else if (formError.message.includes("wrong-password")) {
      formErrorMessage = "Wrong Password.";
    } else if (formError.message.includes("user-not-found")) {
      formErrorMessage = "User not Found."; 
    } else {
      formErrorMessage = "An Error occurred. Try again later.";
    }

    setAuthError(formErrorMessage);
  };

  const registerUser = async (formData) => {
    checkIfIsCancelled();

    setAuthLoading(true);
    setAuthError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        authHandler,
        formData.formEmail,
        formData.formPassword
      );

      await updateProfile(user, {
        displayName: formData.formDisplayName,
      });

      setAuthLoading(false);

      return user;
    } catch (authError) {

      handleAuthError(authError)
      setAuthLoading(false);
    }
  };

  const loginUser = async (formData) => {
    checkIfIsCancelled();

    setAuthLoading(true);
    setAuthError(false);

    try {
      await signInWithEmailAndPassword(
        authHandler,
        formData.formEmail,
        formData.formPassword
      );

      setAuthLoading(false);
    } catch (authError) {

      handleAuthError(authError)
      setAuthLoading(false);
    }
  };

  const logoutUser = () => {
    checkIfIsCancelled();

    signOut(authHandler);
  };

  useEffect(() => {
    return () => setAuthCancelled(true);
  }, []);

  return {
    authHandler,
    registerUser,
    authError,
    authLoading,
    logoutUser,
    loginUser,
  };
};
