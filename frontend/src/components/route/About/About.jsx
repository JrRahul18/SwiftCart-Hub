import React from "react";
import styles from "./About.module.css";
import MetaData from "../../layouts/MetaData/MetaData";
import logoImage from "./swiftCartImage.png";

const About = () => {
  return (
    <>
      <MetaData title={"About Me | SwiftCart Hub"} />
      <div className={styles.outerContainer}>
        <div className={styles.headingBox}>
          <h1 className={styles.heading}>About Me</h1>
        </div>
        <hr className={styles.horizontalLine} />
        <div className={styles.aboutMeBox}>
          <div className={styles.imageBox}>
            <img className={styles.logoImage} src={logoImage} alt="" />
          </div>

          <div className={styles.infoBox}>
            <p className={styles.intro}>
              SwiftCart is a dynamic and modern full-stack eCommerce application
              designed to provide a seamless shopping experience for users.
              Built using the MERN stack (MongoDB, Express.js, React.js,
              Node.js) with Vite as the frontend build tool, SwiftCart ensures
              fast performance and scalability.
            </p>

            <div className={styles.keyFeaturesBox}>
            <p>Key Features: </p>
            <ul>
              {/* <li>
                <p>
                  <span>User Authentication: </span> Secure login and
                  registration using JWT.
                </p>
              </li> */}
              <li>
                <p>
                  <span className={styles.featuresHeading}>User Authentication & Authorisation: </span> Secure
                  login and registration using JWT.
                </p>
              </li>
              <li>
                <p>
                  <span className={styles.featuresHeading}>Product Catalog:</span>  Browse a wide range of products with category filters.
                </p>
              </li>

              <li>
                <p>
                  <span className={styles.featuresHeading}>Shopping Cart: </span> Add, remove, and adjust product quantities in the cart.
                </p>
              </li>
              <li>
                <p>
                  <span className={styles.featuresHeading}>Order Management: </span>Users can place orders and view order history, while admins
                  can manage and update orders.
                </p>
              </li>
              <li>
                <p>
                  <span className={styles.featuresHeading}>Admin Dashboard: </span> Full control over products, orders, and users, with options to
                  add, update, and delete entries.
                </p>
              </li>
            </ul>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
