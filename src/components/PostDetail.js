import styles from "./postDetail.module.css";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";

const PostDetail = ({ displayPost }) => {
  useEffect(() => {
    const images = document.querySelectorAll("img");

    const handleImageLoad = (event) => {
      const image = event.target;
      if (image.naturalHeight > 800) {
        image.classList.add(`${styles.fill}`);
      }
    };

    images.forEach((image) => {
      image.addEventListener("load", handleImageLoad);
    });

    return () => {
      images.forEach((image) => {
        image.removeEventListener("load", handleImageLoad);
      });
    };
  }, []);

  return (
    <div className={styles.post_detail}>
      <div className={styles.image_container}>
        <img
          src={displayPost.postImage}
          alt={displayPost.postTitle}
          className={styles.image}
        />
      </div>

      <h2>{displayPost.postTitle}</h2>

      <p className={styles.createdby}>{displayPost.createdBy}</p>

      <div className={styles.tags}>
        {displayPost.tagsArray.map((postTag) => (
          <p key={postTag}>
            <span>#</span>
            {postTag}
          </p>
        ))}
      </div>

      <Link to={`/Posts/${displayPost.id}`} className="btn btn-outline">
        View
      </Link>
    </div>
  );
};

export default PostDetail;
