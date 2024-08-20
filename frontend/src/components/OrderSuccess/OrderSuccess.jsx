import React from 'react'
import styles from "./OrderSuccess.module.css"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <>
    <div className={styles.outerContainer}>

      <div className={styles.successBox}>
        <CheckCircleIcon className={styles.successIcon}/>
        <h3 className={styles.heading}>Happy Shopping! </h3>
        <p className={styles.subHeading}>Your order is placed successfully.</p>

        <Link className={styles.link} to={"/my-orders"}>View Your Orders</Link>
      </div>
    </div>
    </>
  )
}

export default OrderSuccess