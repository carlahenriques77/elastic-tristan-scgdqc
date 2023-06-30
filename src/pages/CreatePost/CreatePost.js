import "./CreatePost.scss";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useCreatePost } from "../../hooks/usePostManagement";
import useAllFormFields from "../../hooks/useAllFormFields";

const CreatePost = () => {
  const {
    postTitle,
    postImage,
    setPostImage,
    postBody,
    postTags,
    formPostError,
    setFormPostError,
    selectedLanguage,
    handlePostTitleChange,
    handlePostImageChange,
    handlePostBodyChange,
    handlePostTagsChange,
    handleSelectedLanguageChange
  } = useAllFormFields();

  const { currentUser } = useAuthValue();
  const { insertDocument, createResponse, createLoading } = useCreatePost(
    "posts"
  );
  const submitFormRedirect = useNavigate();

  const formHandleSubmit = (submitEvent) => {
    submitEvent.preventDefault();

    setFormPostError("");

    try {
      new URL(postImage);
    } catch (error) {
      setFormPostError("The Image must be a valid URL.");
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
      setFormPostError("Please fill all of the inputs.");
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
    <div className="container_create">
      <img
        className="create_post_girl"
        src="https://bestprofilepictures.com/wp-content/uploads/2022/09/Pretty-Anime-Girl-Profile-Picture-1024x1024.jpg"
        alt="Create Post Girl"
      />

      <form className="create_post_form" onSubmit={formHandleSubmit}>
        <h2 className="createpost_title">New Post</h2>
        <p className="createpost_desc">Connect and Engage</p>

        <label className="createpost_label">
          <span className="createpost_input_span">Title:</span>
          <input
            className="createpost_input"
            type="text"
            name="postTitle"
            placeholder="Post Title"
            onChange={handlePostTitleChange}
            value={postTitle}
          />
        </label>

        <label className="createpost_label">
          <span className="createpost_input_span">Image URL:</span>
          <input
            className="createpost_input"
            type="text"
            name="postImage"
            placeholder="Image URL"
            onChange={handlePostImageChange}
            value={postImage}
          />
        </label>

        <p className="edit_image_preview_paragraph">Image Preview:</p>
        {!postImage && (
          <>
            <p className="edit_image_preview_waiting">Waiting for URL...</p>
          </>
        )}
        {postImage && (
          <>
            <img
              src={postImage}
              alt={insertDocument.postTitle}
              className="edit_image_preview"
            />
          </>
        )}

        <label className="createpost_label">
          <span className="createpost_input_span">Description:</span>
          <textarea
            className="createpost_input"
            type="text"
            name="postBody"
            placeholder="Enter Post Description"
            onChange={handlePostBodyChange}
            value={postBody}
          />
        </label>

        <label className="createpost_label">
          <span className="createpost_input_span">Tags:</span>
          <input
            className="createpost_input"
            type="text"
            name="postTags"
            placeholder="Add Tags (comma-separated)"
            onChange={handlePostTagsChange}
            value={postTags}
          />
        </label>

        <label className="createpost_label">
          <span className="createpost_input_span">Language:</span>
          <select
            className="language_select"
            value={selectedLanguage}
            onChange={handleSelectedLanguageChange}
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

        {!createLoading ? (
          <button className="nice_button_1">Create</button>
        ) : (
          <button className="nice_button_1" disabled>
            Loading...
          </button>
        )}

        {createResponse.managementError && (
          <p className="error">{createResponse.managementError}</p>
        )}
        {formPostError && <p className="error">{formPostError}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
