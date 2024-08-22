import React, { useEffect } from "react";
import styles from "./OrderDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders, getOrderDetails } from "../../../actions/orderAction";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../LoadingPage/Loading";
import MetaData from "../MetaData/MetaData";
import { Typography } from "@mui/material";
import CachedIcon from '@mui/icons-material/Cached';
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const OrderDetails = () => {
  const params = useParams();

  const dispatch = useDispatch();
  // const {user} = useSelector((store)=> store.userCombine.userReducer);
  const { order, error, loading } = useSelector(
    (store) => store.orderCombine.orderDetailsReducer
  );
  // console.log("Order: ", order)

  const address = order && order.shippingInformation ? `${order.shippingInformation.address}, ${order.shippingInformation.city}, ${order.shippingInformation.state}, ${order.shippingInformation.pinCode}, ${order.shippingInformation.country}` : '';

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
    }
    dispatch(getOrderDetails(params.id));
  }, [dispatch, error, toast]);

  return (
    <>
    <MetaData title={"Order Details"}/>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.outerContainer}>
            <div className={styles.headingBox}>
              <h1 className={styles.heading}>Order Details</h1>
            </div>
            <hr className={styles.horizontalLine} />

            <div className={styles.orderDetailsBox}>
          <div className={styles.shippingAndCartDataBox}>
            <div className={styles.orderIdBox}>
              <h4 className={styles.subheading}>Order No.: </h4>
              <span className={styles.orderId}>{order && order._id}</span>
            </div>
            <div className={styles.shippingAreaBox}>
              <Typography className={styles.subheading}>
                Shipping Info
              </Typography>
              <div className={styles.nameBox}>
                <h4 className={styles.nameHeading}>Name: </h4>
                <p className={styles.name}>{ order.user && order.user.name}</p>
              </div>
              <div className={styles.phoneNumberBox}>
                <h4 className={styles.phoneNumberHeading}>Phone No. : </h4>
                <p className={styles.phoneNumber}>{order.shippingInformation && order.shippingInformation.contactNumber}</p>
              </div>
              <div className={styles.addressBox}>
                <h4 className={styles.addressHeading}>Address: </h4>
                <p className={styles.address}>{address}</p>
              </div>
              <div className={styles.pincodeBox}>
                <h4 className={styles.pincodeHeading}>PinCode: </h4>
                <p className={styles.pincode}>{order.shippingInformation && order.shippingInformation.pinCode}</p>
              </div>
            </div>

            <div className={styles.cartDataBox}>
              <Typography className={styles.subheading}>
                Your Cart Items
              </Typography>
              <div className={styles.dataBox}>
                {order.orderItems &&
                  order.orderItems.map((item, index) => (
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
            <div className={`${styles.paymentStatusBox} ${order.paymentInformation && (order.paymentInformation.status === "succeeded" ? styles.greenBg : styles.redBg )}`}>
              <h3 className={styles.subheading}> Payment Status</h3>
              {order.paymentInformation && (order.paymentInformation.status === "succeeded" ? <CheckCircleIcon className={styles.successIcon}/> : <ReportIcon className={styles.failIcon}/> )}
              <p className={`${order.paymentInformation && (order.paymentInformation.status === "succeeded" ? styles.successStatus : styles.failStatus )}`}>
              {order.paymentInformation && (order.paymentInformation.status === "succeeded" ? "Paid" : "Unpaid")}
              </p>
            </div>
            <div className={`${styles.orderStatusBox} ${order.orderStatus && (order.orderStatus === "Processing" ? styles.yellowBg : styles.greenBg )}`}>
              <h3 className={styles.subheading}>Order Status</h3>

              {order.orderStatus && (order.orderStatus === "Processing" ? <CachedIcon className={styles.warningIcon}/> : <CheckCircleIcon className={styles.successIcon}/> )}
              <p className={`${order.orderStatus && (order.orderStatus === "Processing" ? styles.warningStatus : styles.successStatus )}`}>
              {order.orderStatus && (order.orderStatus === "Processing" ? "Processing" : "Delivered")}
              </p>
            </div>
          {/* <div className={styles.orderSummaryBox}>
              <Typography className={styles.subheading}>Payment Status</Typography>
              <hr  className={styles.horizontalLine}/>              
              <div className={styles.subtotalBox}>
                <h4 className={styles.subtotalHeading}>Status: </h4>
                <p className={styles.subtotal}>{order.paymentInformation && (order.paymentInformation.status === "succeeded" ? "Paid" : "Unpaid")}</p>
              </div>

              <Typography className={styles.subheading}>Order Status</Typography>
              <hr  className={styles.horizontalLine}/>              
              <div className={styles.subtotalBox}>
                <h4 className={styles.subtotalHeading}>Status: </h4>
                <p className={styles.subtotal}>{order.orderStatus && (order.orderStatus === "Processing" ? "Processing" : "Delivered")}</p>
              </div>
            </div> */}
            <div className={styles.orderSummaryBox}>
              <Typography className={styles.subheading}>Order Summary</Typography>
              <hr  className={styles.horizontalLine}/>              
              <div className={styles.subtotalBox}>
                <h4 className={styles.subtotalHeading}>Subtotal: </h4>
                <p className={styles.subtotal}>{`₹${order && order.itemsPrice}`}</p>
              </div>

              <div className={styles.shippingChargesBox}>
                <h4 className={styles.shippingChargesHeading}>Shipping Charges: </h4>
                <p className={styles.shippingCharges}>{`₹${order && order.shippingPrice}`}</p>
              </div>

              <div className={styles.taxBox}>
                <h4 className={styles.taxHeading}>Tax(GST): </h4>
                <p className={styles.tax}>{`₹${order && order.taxPrice}`}</p>
              </div>
            </div>

            <div className={styles.totalBox}>
                <h3 className={styles.totalHeading}>Total: </h3>
                <p className={styles.total}>{`₹${order && order.totalPrice}`}</p>
            </div>
          </div>
        </div>
          </div>
        </>
      )}
      <ToastContainer containerId={"order_details"}/>
    </>
  );
};

export default OrderDetails;
