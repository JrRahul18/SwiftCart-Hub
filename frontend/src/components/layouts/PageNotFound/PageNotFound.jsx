import React from 'react'
import styles from "./PageNotFound.module.css"
import pageNotFound from "./pageNotFound.png"
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <>
    <div className={styles.outerContainer}>
        <div className={styles.pageNotFoundBox}>
            <img className={styles.pageNotFoundImage} src={pageNotFound} alt="" />
            <div className={styles.infoBox}>
                <h1 className={styles.num}>404</h1>
                <h1>PAGE NOT FOUND</h1>
                <p>The page you are looking for does not exist.</p>
                <Link className={styles.link} to={"/"}> Go To Homepage</Link>
            </div>
        </div>
    </div>
    </>
  )
}

export default PageNotFound