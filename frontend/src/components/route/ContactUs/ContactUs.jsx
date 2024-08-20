import React from "react";
import styles from "./ContactUs.module.css";
import { IoLogoLinkedin } from "react-icons/io5";
import { IoLogoInstagram } from "react-icons/io";
import { Link } from "react-router-dom";
import { SiLeetcode } from "react-icons/si";
import { FaGithubSquare } from "react-icons/fa";
import { SiGeeksforgeeks } from "react-icons/si";
import MetaData from "../../layouts/MetaData/MetaData";
import { MdAlternateEmail } from "react-icons/md";

const ContactUs = () => {
  return (
    <>
      <MetaData title={"Contact Us | SwiftCart Hub"} />
      <div className={styles.outerContainer}>
        <div className={styles.headingBox}>
          <h1 className={styles.heading}>Contact Us</h1>
        </div>
        <hr className={styles.horizontalLine} />
        <div className={styles.contactUsBox}>
          {/* <hr className={styles.horizontalLine} /> */}
          <div className={styles.socialsBox}>
            <div className={styles.subheadingBox}>
              <p className={styles.subheading}>Socials</p>
            </div>

            <div className={styles.socialsInfoBox}>
              <div className={styles.linkedInBox}>
                <div className={styles.linkedInIconBox}>
                  <IoLogoLinkedin className={styles.linkedInIcon} />
                </div>
                <Link
                  target="_blank"
                  to={"https://www.linkedin.com/in/rahul-jeena-941a18201/"}
                >
                  //rahul-jeena
                </Link>
              </div>

              <div className={styles.instaBox}>
                <div className={styles.instaIconBox}>
                  <IoLogoInstagram className={styles.instaIcon} />
                </div>
                <Link
                  target="_blank"
                  to={"https://www.instagram.com/rahul_jeena_18/"}
                >
                  //rahul_jeena_18
                </Link>
              </div>
            </div>
          </div>
          <hr className={styles.horizontalLine} />

          <div className={styles.emailBox}>
            <div className={styles.subheadingBox}>
              <p className={styles.subheading}>Email</p>
            </div>
            <div className={styles.emailInfoBox}>
              <div className={styles.mailBox}>
                <div className={styles.mailIconBox}>
                  <MdAlternateEmail className={styles.mailIcon} />
                </div>
                <Link target="_blank" to={""}>
                  rahuljeenaworkspace@gmail.com
                </Link>
              </div>
            </div>
          </div>
          <hr className={styles.horizontalLine} />

          <div className={styles.codingProfilesBox}>
            <div className={styles.subheadingBox}>
              <p className={styles.subheading}>Coding Profiles</p>
            </div>
            <div className={styles.codingProfilesInfoBox}>
              <div className={styles.leetcodeBox}>
                <div className={styles.leetcodeIconBox}>
                  <SiLeetcode className={styles.leetcodeIcon} />
                </div>
                <Link target="_blank" to={"https://leetcode.com/u/18_rahul/"}>
                  //18_rahul
                </Link>
              </div>

              <div className={styles.githubBox}>
                <div className={styles.githubIconBox}>
                  <FaGithubSquare className={styles.githubIcon} />
                </div>
                <Link target="_blank" to={"https://github.com/JrRahul18"}>
                  //JrRahul18
                </Link>
              </div>

              <div className={styles.gfgBox}>
                <div className={styles.gfgIconBox}>
                  <SiGeeksforgeeks className={styles.gfgIcon} />
                </div>
                <Link
                  target="_blank"
                  to={"https://www.geeksforgeeks.org/user/rahuljeena16/"}
                >
                  //rahuljeena16
                </Link>
              </div>
            </div>
          </div>
          {/* <hr className={styles.horizontalLine} /> */}
        </div>
      </div>
    </>
  );
};

export default ContactUs;
