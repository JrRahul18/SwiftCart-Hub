import React from "react";
import styles from "./ReviewCard.module.css";
// import ReactStars from "react-rating-stars-component";
import profileImage from "./profile.png";
import { Rating } from "@mui/material";
import "./ReviewCard.css"

const ReviewCard = ({ review }) => {
  const options = {
    size: "large",
    precision: 0.5,
    readOnly: true,
    value: review.rating,
    color: '#ffd700'
  };
  // console.log("Review Rating ",review.rating)
  return (
    <div className={styles.reviewCard}>
      <div className={styles.pfpBox}>
        <img className={styles.userImage} src={profileImage} alt="" />
      </div>
      <div className={styles.reviewData}>
        <p className={styles.userName}>{review.name}</p>
        <div className={styles.userRating}>
          <Rating className={styles.ratingStars} {...options} color= "#c4c4c4" />
        </div>
        <div className={styles.commentBox}>
          <p className={styles.userComment}>{review.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
