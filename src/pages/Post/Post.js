import React from "react";
import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import "./Post.scss";

const Post = () => {
  const { id } = useParams();
  const { postDocument, postLoadingStatus } = useFetchDocument("posts", id);

  let languageTitleColor = "single_post_title";

  if (
    postDocument &&
    postDocument.selectedLanguage !==
      "https://images.freeimages.com/fic/images/icons/662/world_flag/256/flag_of_united_kingdom.png"
  ) {
    languageTitleColor += " post_spanish_post";
  }

  return (
    <div className="single_post_container">
      <div className="post_content">
        {postLoadingStatus && <p>Loading...</p>}
        {postDocument && (
          <>
            <div className="post_image_container">
              <img
                className="post_image"
                src={postDocument.postImage}
                alt={postDocument.postTitle}
              />
            </div>

            <div className="post_info">
              <h1 className={languageTitleColor}>{postDocument.postTitle}</h1>
              <p className="post_description">{postDocument.postBody}</p>
              <div className="the_post_tags">
                <h3 className="post_tags_title">Tags:</h3>
                {postDocument.tagsArray.map((postTag) => (
                  <p className="post_tag" key={postTag}>
                    <span className="post_tag_span">#</span>
                    {postTag}
                  </p>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Post;
