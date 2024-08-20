import React from "react";
import styles from "./Loading.module.css";
const Loading = () => {
  return (
    <div className={styles.outerContainer}>
        <div className={styles.loadingBox}>
            <div className={styles.insideBox}></div>
            <p>Loading...</p>
        </div>
    </div>
  );
};

export default Loading;
