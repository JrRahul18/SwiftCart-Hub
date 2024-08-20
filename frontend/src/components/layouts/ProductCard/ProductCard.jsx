import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
// import ReactStars from "react-rating-stars-component";
import { Rating } from "@mui/material";

const ProductCard = ({ productData }) => {
  const options = {
    size: "large",
    precision: 0.5,
    readOnly: true,
    value: productData.ratings,
    color: "#ffd700",
  };
  return (
    <div key={productData.id}>
      <Link className={styles.productCard} to={`/product/${productData._id}`}>
        <div className={styles.imageBox}>
          <img src={productData.image[0].url} alt="Product Image" />
        </div>
        <div className={styles.nameBox}>
          <h4>{productData.name}</h4>
        </div>
        <div className={styles.productInfo}>
          <Rating {...options} className={styles.reactStars} />
          <span className={styles.reviewBox}>
            <p>{`(${productData.numberOfReviews} reviews)`}</p>
          </span>
        </div>
        <span className={styles.priceTag}>
          <h3> ₹ {productData.price}</h3>
        </span>
      </Link>
    </div>
  );
};

export default ProductCard;
