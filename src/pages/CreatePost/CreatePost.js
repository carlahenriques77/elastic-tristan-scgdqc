import styles from "./CreatePost.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useCreatePost } from "../../hooks/usePostManagement";

const CreatePost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postImage, setPostImage] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postTags, setPostTags] = useState([]);
  const [formError, setFormError] = useState("");
  const { currentUser } = useAuthValue();
  const { insertDocument, createResponse, createLoading } = useCreatePost(
    "posts"
  );
  const submitFormRedirect = useNavigate();

  const [selectedLanguage, setSelectedLanguage] = useState("");

  const formHandleSubmit = (submitEvent) => {
    submitEvent.preventDefault();

    setFormError("");

    try {
      new URL(postImage);
    } catch (error) {
      setFormError("The Image must be a valid URL.");
      return;
    }

    const tagsArray = postTags
      .split(",")
      .map((postTag) => postTag.trim().toLowerCase());

    if (
      !postTitle ||
      !postImage ||
      !postTags ||
      !postBody ||
      !selectedLanguage
    ) {
      setFormError("Please fill all of the inputs.");
      return;
    }

    insertDocument({
      postTitle,
      postImage,
      postBody,
      tagsArray,
      selectedLanguage,
      uid: currentUser.uid,
      createdBy: currentUser.displayName
    });

    submitFormRedirect("/");
  };

  return (
    <div className={styles.create_post}>
      <h2>Create Post</h2>
      <p>Paragraph</p>
      <form onSubmit={formHandleSubmit}>
        <label>
          <span>Title:</span>
          <input
            type="text"
            name="postTitle"
            placeholder="Post Title"
            onChange={(e) => setPostTitle(e.target.value)}
            value={postTitle}
          />
        </label>
        <label>
          <span>Image URL:</span>
          <input
            type="text"
            name="postImage"
            placeholder="Image URL"
            onChange={(e) => setPostImage(e.target.value)}
            value={postImage}
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <input
            type="text"
            name="postBody"
            placeholder="Content"
            onChange={(e) => setPostBody(e.target.value)}
            value={postBody}
          />
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="postTags"
            placeholder="Insira as postTags separadas por vírgula"
            onChange={(e) => setPostTags(e.target.value)}
            value={postTags}
          />
        </label>
        <label>
          <span>Language:</span>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="">Select a language</option>
            <option value="https://images.freeimages.com/fic/images/icons/662/world_flag/256/flag_of_united_kingdom.png">
              English
            </option>
            <option value="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Spain_flag_icon.svg/2048px-Spain_flag_icon.svg.png">
              Spanish
            </option>
          </select>
        </label>

        {!createLoading && <button className="btn">Create</button>}
        {createLoading && (
          <button className="btn" disabled>
            Loading...
          </button>
        )}
        {createResponse.managementError && (
          <p className="error">{createResponse.managementError}</p>
        )}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
