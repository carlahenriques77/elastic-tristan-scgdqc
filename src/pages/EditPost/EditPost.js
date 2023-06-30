import "./EditPost.scss";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useEditPost } from "../../hooks/usePostManagement";
import useAllFormFields from "../../hooks/useAllFormFields";

const EditPost = () => {
  const {
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
    handlePostTitleChange,
    handlePostImageChange,
    handlePostBodyChange,
    handlePostTagsChange,
    handleSelectedLanguageChange
  } = useAllFormFields();

  const { id } = useParams();
  const { postDocument } = useFetchDocument("posts", id);
  const { currentUser } = useAuthValue();
  const { editDocument, editResponse, editLoading } = useEditPost("posts");

  useEffect(() => {
    if (postDocument) {
      setPostTitle(postDocument.postTitle);
      setPostImage(postDocument.postImage);
      setPostBody(postDocument.postBody);
      const textTags = postDocument.tagsArray.join(", ");
      setPostTags(textTags);
    }
  }, [postDocument, setPostTitle, setPostImage, setPostBody, setPostTags]);

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

    const data = {
      postTitle,
      postImage,
      postBody,
      tagsArray,
      selectedLanguage,
      uid: currentUser.uid,
      createdBy: currentUser.displayName
    };

    editDocument(id, data);

    submitFormRedirect("/Dashboard");
  };

  return (
    <div className="container_edit">
      {postDocument && (
        <>
          <img
            className="edit_post_girl"
            src="https://pm1.aminoapps.com/7599/c5bb112f8c58a307f2c6a826cbc693e844cc7080r1-640-640v2_uhq.jpg"
            alt="Edit Post Girl"
          />

          <form className="edit_post_form" onSubmit={formHandleSubmit}>
            <h2 className="edit_post_title">
              Edit Post: {postDocument.postTitle}
            </h2>
            <p className="edit_post_desc">Edit the Post</p>

            <label className="edit_post_label">
              <span className="edit_post_input_span">Title:</span>
              <input
                className="edit_post_input"
                type="text"
                name="postTitle"
                placeholder="Post Title"
                onChange={handlePostTitleChange}
                value={postTitle}
              />
            </label>

            <label className="edit_post_label">
              <span className="edit_post_input_span">Image URL:</span>
              <input
                className="edit_post_input"
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
                  alt={postDocument.postTitle}
                  className="edit_image_preview"
                />
              </>
            )}

            <label className="edit_post_label">
              <span className="edit_post_input_span">Description:</span>
              <textarea
                className="edit_post_input"
                type="text"
                name="postBody"
                placeholder="Enter Post Description"
                onChange={handlePostBodyChange}
                value={postBody}
              />
            </label>

            <label className="edit_post_label">
              <span className="edit_post_input_span">Tags:</span>
              <input
                className="edit_post_input"
                type="text"
                name="postTags"
                placeholder="Add Tags (comma-separated)"
                onChange={handlePostTagsChange}
                value={postTags}
              />
            </label>

            <label className="edit_post_label">
              <span className="edit_post_input_span">Language:</span>
              <select
                className="edit_language_select"
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

            {!editLoading ? (
              <button className="button_style_4">Update Post</button>
            ) : (
              <button className="button_style_4" disabled>
                Loading...
              </button>
            )}

            {editResponse.managementError && (
              <p className="error">{editResponse.managementError}</p>
            )}
            {formPostError && <p className="error">{formPostError}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
