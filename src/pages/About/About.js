import React from "react";

import "./About.scss";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about_container">
      <h2>Welcome to Our MiniBlog! [This Page is Useless]</h2>

      <p className="about_description">
        This is my 2# Time doing this Project. It was pretty Hard to understand
        at first, but... After doing it again, it got a Easier to understand
        what was happening. This Project was made with Firebase and some CSS /
        Styles from other Sites.
      </p>

      <p className="about_description">
        There were a lot of Problems and things that I didn't Complete, as it's
        unlikely that you would see it.
      </p>

      <p className="about_description">
        Thanks for coming, by the way. It really makes me Happy and means a lot
        to me when you are here✨. I love you❤️
      </p>

      <p>Loading Animation:</p>

      <div className="spinner_container">
        <div id="html-spinner"></div>
      </div>

      <Link to="/Posts/Create" className="button_style_4">
        Create a New Post
      </Link>
    </div>
  );
};

export default About;
