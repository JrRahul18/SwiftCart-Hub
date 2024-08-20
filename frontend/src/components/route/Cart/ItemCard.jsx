import React from "react";
import styles from "./ItemCard.module.css";
import {Link} from "react-router-dom"

const ItemCard = ({ item, deleteItem }) => {
  return (
    <div className={styles.productCard}>
      <img className={styles.itemImage} src={item.image} alt="ssaa" />
      {/* <img src={item.image} alt="asdas" /> */}
      <div className={styles.infoBox}>
        <Link className={styles.itemName} to={`/product/${item.product}`}>{item.name}</Link>
        <span className={styles.itemPrice}> {`Price: ₹ ${item.price}`}</span>
        <Link onClick={()=>{deleteItem(item.product)}} className={styles.remove}>Remove</Link>
      </div>
    </div>
  );
};

export default ItemCard;
