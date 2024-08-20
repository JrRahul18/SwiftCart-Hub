import React, { useState } from "react";
import styles from "./Cart.module.css";
import ItemCard from "./ItemCard";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, removeItemFromCart } from "../../../actions/cartAction";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../../layouts/MetaData/MetaData";

const Cart = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartData } = useSelector((store) => store.cartCombine.cartReducer);

  // const cartData = []

  const decreaseQuantity = (id, quantity)=>{
    const newQuantity = quantity-1;
    if(quantity <=1) return;
    dispatch(addItemsToCart(id, newQuantity))
  }
  const increaseQuantity = (id, quantity, stock)=>{
    const newQuantity = quantity+1;
    if(stock <= quantity) return;
    dispatch(addItemsToCart(id,newQuantity))
  }

  const deleteItemHandler = (id) =>{
    dispatch(removeItemFromCart(id))
  }

  const cartCheckoutHandler = () =>{
    navigate("/login?redirect=shipping")
  }

  return (
    <>
    <MetaData title={"My Cart"}/>
      {cartData.length === 0 ? 
      <div className={styles.outerContainer}>
        <div className={styles.headingBox}>
          <h1>My Cart</h1>
        </div>
        <hr className={styles.horizontalLine}/>
        <div className={styles.emptyCartBox}>
          <p className={styles.emptyCart}>Your Cart Is Empty</p>
          <Link className={styles.viewProductLink} to={"/products"}>View Products</Link>
        </div>
        
      </div>
      : 
      <div className={styles.outerContainer}>
        <div className={styles.headingBox}>
          <h1>My Cart</h1>
        </div>
        <hr className={styles.horizontalLine}/>
        <div className={styles.cartBox}>
          <div className={styles.columnHeadingBox}>
            <div className={styles.productColumn}>
              <p className={styles.productTitle}>Product</p>
            </div>
            <div className={styles.quantityColumn}>
              <p className={styles.quantityTitle}>Quantity</p>
            </div>
            <div className={styles.subtotalColumn}>
              <p className={styles.subtotalTitle}> Subtotal</p>
            </div>
          </div>
          <div className={styles.dataBox}>
            {cartData && (
              cartData.map((item, index) => (
                <div key={index} className={styles.itemBox}>
                  <ItemCard deleteItem = {deleteItemHandler} item={item} />
                  <div className={styles.quantityInput}>
                    <div>
                      <button onClick={()=> decreaseQuantity(item.product, item.quantity)} className={styles.lessButton}>-</button>
                    </div>
                    <input value={item.quantity} className={styles.countInput} type="number" readOnly/>
                    <div>
                      <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)} className={styles.moreButton}>+</button>
                    </div>
                  </div>
                  <div className={styles.subtotalCount}>
                    <p>{`₹ ${item.price * item.quantity}`}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <hr className={styles.hrLine} />

          <div className={styles.totalBox}>
            <div className={styles.totalHeadingBox}>
              <h3 className={styles.totalHeading}>Total: </h3>
            </div>
            <div className={styles.totalPriceBox}>
              {" "}
              <p className={styles.totalPrice}>{`₹ ${cartData.reduce(
                (acc, item)=> acc + (item.quantity * item.price),0
              )}`}</p>
            </div>
          </div>
        </div>
        <div className={styles.checkOutBox}>
          <button onClick={cartCheckoutHandler} className={styles.checkOutButton}>Check Out</button>
        </div>
      </div> }
    </>
  );
};

export default Cart;
