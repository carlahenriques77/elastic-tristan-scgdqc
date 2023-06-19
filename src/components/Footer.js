import React from 'react';

// import / style
import styles from "./Footer.module.css";

const Footer = (props) =>{
    return (
        <footer className={styles.footer}>
            <h3>Write about what you are Interested in!</h3>
            <p>Mini Blog &copy; 2023</p>
        </footer>
    );
}

export default Footer;