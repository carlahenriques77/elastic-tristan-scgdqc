import "./PostDetail.scss"
import { Link } from "react-router-dom";

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

          <ul className="post_tags">
            {displayPost.tagsArray.map((postTag) => (
              <li className="post_tag" key={postTag}>{postTag}</li>
            ))}
          </ul>

          <Link className="view_post_link" to={`/Posts/${displayPost.id}`}>
            Learn More
          </Link>
        </div>
      </div>

      <div className="title_container">
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
    </div>
  );
};

export default PostDetail;
