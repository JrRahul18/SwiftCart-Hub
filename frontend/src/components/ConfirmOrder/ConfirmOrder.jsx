import React from "react";
import styles from "./ConfirmOrder.module.css";
import { useSelector } from "react-redux";
import CheckoutStep from "../layouts/CheckoutStep/CheckoutStep";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartData } = useSelector(
    (store) => store.cartCombine.cartReducer
  );
  const { user } = useSelector((store) => store.userCombine.userReducer);

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const subtotal = cartData.reduce(
    (count, item) => count + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 100;
  const tax = subtotal * 0.18;

  const totalPrice = subtotal + shippingCharges + tax;

  const proceedPaymentHandler = (event) =>{
    event.preventDefault();
    const data = {subtotal, shippingCharges, tax, totalPrice}
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  }
  // console.log("Subtotal: ", subtotal, " Shipping: ", shippingCharges, " tax: ", tax, " totalPrice: ", totalPrice)

  return (
    <>
      <div className={styles.outerContainer}>
        <div className={styles.headingBox}>
          <h1 className={styles.heading}>Confirm Your Order</h1>
        </div>
        <hr className={styles.horizontalLine} />
        <div className={styles.shippingStepperBox}>
          <CheckoutStep activeStep={1} />
        </div>

        <div className={styles.shippingAndOrderBox}>
          <div className={styles.shippingAndCartDataBox}>
            <div className={styles.shippingAreaBox}>
              <Typography className={styles.subheading}>
                Shipping Info
              </Typography>
              <div className={styles.nameBox}>
                <h4 className={styles.nameHeading}>Name: </h4>
                <p className={styles.name}>{user.name}</p>
              </div>
              <div className={styles.phoneNumberBox}>
                <h4 className={styles.phoneNumberHeading}>Phone No. : </h4>
                <p className={styles.phoneNumber}>{shippingInfo.contactNumber}</p>
              </div>
              <div className={styles.addressBox}>
                <h4 className={styles.addressHeading}>Address: </h4>
                <p className={styles.address}>{address}</p>
              </div>
              <div className={styles.pincodeBox}>
                <h4 className={styles.pincodeHeading}>PinCode: </h4>
                <p className={styles.pincode}>{shippingInfo.pinCode}</p>
              </div>
            </div>

            <div className={styles.cartDataBox}>
              <Typography className={styles.subheading}>
                Your Cart Items
              </Typography>
              <div className={styles.dataBox}>
                {cartData &&
                  cartData.map((item, index) => (
                    <div key={index} className={styles.itemBox}>
                      <div className={styles.productCard}>
                        <img className={styles.itemImage} src={item.image} alt={item.name} />
                        <div className={styles.infoBox}>
                            <Link className={styles.itemName} to={`/product/${item.product}`}>
                            {item.name}
                            </Link>
                            <div className={styles.priceBox}>
                                <h4 className={styles.priceHeading}>Price: </h4>
                                <span className={styles.itemPrice}>{`₹${item.price}`}</span>
                            </div>
                            <div className={styles.quantityBox}>
                                <h4 className={styles.quantityHeading}>Quantity: </h4>
                                <span className={styles.itemQuantity}>{item.quantity}</span>
                            </div>
                        </div>
                      </div>

                      <div className={styles.quantityAndTotal}>
                        <p className={styles.itemTotalPrice}>{`₹ ${item.price * item.quantity}`}</p>

                        <span className={styles.quantityAndPrice}>{`(${item.quantity} X ${item.price})`}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className={styles.orderSummaryAndPaymentBox}>
            <div className={styles.orderSummaryBox}>
              <Typography className={styles.subheading}>Order Summary</Typography>
              <hr  className={styles.horizontalLine}/>              
              <div className={styles.subtotalBox}>
                <h4 className={styles.subtotalHeading}>Subtotal: </h4>
                <p className={styles.subtotal}>{`₹${subtotal}`}</p>
              </div>

              <div className={styles.shippingChargesBox}>
                <h4 className={styles.shippingChargesHeading}>Shipping Charges: </h4>
                <p className={styles.shippingCharges}>{`₹${shippingCharges}`}</p>
              </div>

              <div className={styles.taxBox}>
                <h4 className={styles.taxHeading}>Tax(GST): </h4>
                <p className={styles.tax}>{`₹${tax}`}</p>
              </div>
            </div>

            <div className={styles.totalBox}>
                <h3 className={styles.totalHeading}>Total: </h3>
                <p className={styles.total}>{`₹${totalPrice}`}</p>
       
            </div>
            <div className={styles.paymentButtonBox}>
              <button onClick={proceedPaymentHandler} className={styles.paymentButton} type="submit">Proceed to Payment</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
