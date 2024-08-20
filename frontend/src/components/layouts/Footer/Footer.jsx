import React from "react";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaAppStore } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer id="footer" className={styles.footerBox}>
      <div className={styles.outerContainer}>
        <div className={styles.div1}>
          <h4>Download Our App</h4>
          <div className={styles.iconBox}>
            <IoLogoGooglePlaystore className={styles.icons} cursor={"pointer"}/>
            <FaAppStore className={styles.icons}  cursor={"pointer"}/>
          </div>
        </div>
        <div className={styles.div2}>
          <h1>SwiftCart Hub</h1>
          <p>Your trusted Ecommerce Platform</p>
          <p>Copyright 2023 &copy; Jr.Rahul</p>
        </div>
        <div className={styles.div3}>
          <h4>Follow Us On</h4>
          <div className={styles.iconBox}>
            <FaSquareXTwitter className={styles.icons}  cursor={"pointer"} />
            <FaLinkedin className={styles.icons}  cursor={"pointer"}/>
            <FaInstagramSquare className={styles.icons}  cursor={"pointer"}/>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
