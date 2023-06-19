import React from "react";

import styles from "./About.module.scss";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={styles.about}>
      <Link to="/Posts/Create" className="btn">
        Create Post
      </Link>
    </div>
  );
};

export default About;
