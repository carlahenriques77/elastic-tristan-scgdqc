import { useState } from "react";

export const useAllFormFields = () => {
  // <////Register // Login Form States////>
  const [formDisplayName, setFormDisplayName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formConfirmPassword, setFormConfirmPassword] = useState("");
  const [formAuthError, setFormAuthError] = useState("");
  // <////Register // Login Form States////>

  // <////Register // Login Form Event Handlers////>
  const handleDisplayNameChange = (changeEvent) => {
    setFormDisplayName(changeEvent.target.value);
  };

  const handleEmailChange = (changeEvent) => {
    setFormEmail(changeEvent.target.value);
  };

  const handlePasswordChange = (changeEvent) => {
    setFormPassword(changeEvent.target.value);
  };

  const handleConfirmPasswordChange = (changeEvent) => {
    setFormConfirmPassword(changeEvent.target.value);
  };
  // <////Register // Login Form Event Handlers////>

  // <////Create // Edit Post Form States////>
  const [postTitle, setPostTitle] = useState("");
  const [postImage, setPostImage] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postTags, setPostTags] = useState([]);
  const [formPostError, setFormPostError] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  // <////Create // Edit Post Form States////>

  // <////Create // Edit Post Form Event Handlers////>
  const handlePostTitleChange = (changeEvent) => {
    setPostTitle(changeEvent.target.value);
  };

  const handlePostImageChange = (changeEvent) => {
    setPostImage(changeEvent.target.value);
  };

  const handlePostBodyChange = (changeEvent) => {
    setPostBody(changeEvent.target.value);
  };

  const handlePostTagsChange = (changeEvent) => {
    setPostTags(changeEvent.target.value);
  };

  const handleSelectedLanguageChange = (changeEvent) => {
    setSelectedLanguage(changeEvent.target.value);
  };
  // <////Create // Edit Post Form Event Handlers////>

  return {
    // <////Register // Login States Return////>
    formDisplayName,
    setFormDisplayName,
    formEmail,
    setFormEmail,
    formPassword,
    setFormPassword,
    formConfirmPassword,
    setFormConfirmPassword,
    formAuthError,
    setFormAuthError,
    // <////Register // Login States Return////>

    // <////Register // Login Event Handlers////>
    handleDisplayNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    // <////Register // Login Event Handlers////>

    // <////Post States Return////>
    postTitle,
    setPostTitle,
    postImage,
    setPostImage,
    postBody,
    setPostBody,
    postTags,
    setPostTags,
    formPostError,
    setFormPostError,
    selectedLanguage,
    setSelectedLanguage,
    // <////Post States Return////>

    // <////Post Event Handlers////>
    handlePostTitleChange,
    handlePostImageChange,
    handlePostBodyChange,
    handlePostTagsChange,
    handleSelectedLanguageChange,
    // <////Post Event Handlers////>
  };
};

export default useAllFormFields;
