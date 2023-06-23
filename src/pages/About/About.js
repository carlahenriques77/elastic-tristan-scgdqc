import React from "react";

import styles from "./About.module.scss";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <h2>Welcome to Our MiniBlog!</h2>

      <p>
        Our MiniBlog is a platform where you can express your thoughts, share
        your experiences, and connect with like-minded individuals. Whether you
        are a seasoned writer or just starting out, our community welcomes you
        to share your stories and insights.
      </p>

      <p>Join us today and become a part of our vibrant blogging community!</p>

      <Link to="/Posts/Create">Create a New Post</Link>
    </div>
  );
};

export default About;
