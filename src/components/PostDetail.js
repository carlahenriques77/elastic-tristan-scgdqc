import "./PostDetail.scss"
import { Link } from "react-router-dom";
import React, { useEffect } from "react";

const PostDetail = ({ displayPost }) => {
  let languageTitleColor = "post_title";

  if (displayPost.selectedLanguage !== "https://images.freeimages.com/fic/images/icons/662/world_flag/256/flag_of_united_kingdom.png") {
    languageTitleColor += " spanish_post";
  }

  return (
    <div className="post_detailDiv">
      <div className="image_container">
        <img
          src={displayPost.postImage}
          alt={displayPost.postTitle}
          className="post_image"
        />

        <div className="info_container">
          <p className="post_createdBy">Post CreatedBy:</p>
          <p className="post_author">{displayPost.createdBy}</p>

          <div className="post_tags">
            {displayPost.tagsArray.map((postTag) => (
              <p className="post_tag" key={postTag}>{postTag}</p>
            ))}
          </div>

          <Link className="view_post_link" to={`/Posts/${displayPost.id}`}>
            Learn More
          </Link>
        </div>
      </div>

      <Link
        to={`/Posts/${displayPost.id}`}
        className={languageTitleColor}
      >
        <img
          src={displayPost.selectedLanguage}
          alt={displayPost.postTitle}
          className="language"
        />
        {displayPost.postTitle}
      </Link>
    </div>
  );
};

export default PostDetail;
