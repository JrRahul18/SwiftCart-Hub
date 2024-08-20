import React, { useDebugValue, useEffect, useRef } from "react";
import styles from "./Payment.module.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography } from "@mui/material";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventNoteIcon from "@mui/icons-material/EventNote";
import KeyIcon from "@mui/icons-material/Key";
import MetaData from "../layouts/MetaData/MetaData";
import CheckoutStep from "../layouts/CheckoutStep/CheckoutStep";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder, createOrderClearErrors } from "../../actions/orderAction";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo, cartData } = useSelector(
    (store) => store.cartCombine.cartReducer
  );
  const { user } = useSelector((store) => store.userCombine.userReducer);
  const { error } = useSelector((store) => store.orderCombine.newOrderReducer);

  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  // const {
  //   shippingInformation,
  //   orderItems,
  //   paymentInformation,
  //   itemsPrice,
  //   taxPrice,
  //   shippingPrice,
  //   totalPrice,
  // } = req.body;

  const orderData = {
    shippingInformation: shippingInfo,
    orderItems: cartData,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice
  };

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const paymentSubmitHandler = async (event) => {
    event.preventDefault();
    payBtn.current.disabled = true;

    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };

      const data = (
        await axios.post(
          "http://localhost:4000/api/v1/payment/process",
          paymentData,
          config
        )
      ).data;

      const clientSecretKey = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(clientSecretKey, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        console.log("stripe.confirmCardPayment error: ", result.error);
        toast.error(result.error.message, {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      } else {
        if (result.paymentIntent.status === "succeeded") {
          orderData.paymentInformation={
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          }
          dispatch(createOrder(orderData));
          navigate("/success");
        } else {
          toast.error("Issue while processing the payment", {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      console.log("error: ", error);
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      dispatch(createOrderClearErrors());
    }
  }, [dispatch, error, toast]);
  return (
    <>
      <MetaData title={"Payment"} />
      <div className={styles.outerContainer}>
        {/* <div className={styles.headingBox}>
          <h1>Payment</h1>
        </div>
        <hr className={styles.horizontalLine} /> */}
        <div className={styles.shippingStepperBox}>
          <CheckoutStep activeStep={2} />
        </div>

        <div className={styles.paymentBox}>
          <form
            className={styles.paymentForm}
            action=""
            onSubmit={paymentSubmitHandler}
          >
            <div className={styles.subHeadingBox}>
              <Typography className={styles.subHeading}>Card Info</Typography>
            </div>
            <div className={styles.cardNumberBox}>
              <CreditCardIcon className={styles.cardNumberIcon} />
              <CardNumberElement className={styles.cardNumberInput} />
            </div>
            <div className={styles.expiryDateBox}>
              <EventNoteIcon className={styles.expiryDateIcon} />
              <CardExpiryElement className={styles.expiryDateInput} />
            </div>
            <div className={styles.cvvBox}>
              <KeyIcon className={styles.cvvIcon} />
              <CardCvcElement className={styles.cvvInput} />
            </div>

            <div className={styles.paymentButtonBox}>
              <button
                ref={payBtn}
                className={styles.paymentButton}
                type="submit"
              >{`Pay ₹${orderInfo && orderInfo.totalPrice}`}</button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer  containerId={"payment"}/>
    </>
  );
};

export default Payment;
