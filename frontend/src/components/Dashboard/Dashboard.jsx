import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import AdminSidebar from "../layouts/AdminSidebar/AdminSidebar";
import MetaData from "../layouts/MetaData/MetaData";
import { useDispatch, useSelector } from "react-redux";
import {
  adminProductsClearErrors,
  getAdminProducts,
} from "../../actions/productAction";
import { getAdminOrders } from "../../actions/orderAction";
import { getAdminUsers } from "../../actions/userAction";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  // const myParam = useParams();
  const query = new URLSearchParams(window.location.search);
  const myParam = query.get("success");
  const myParam2 = query.get("deletesuccess");
  const dispatch = useDispatch();
  const { products } = useSelector(
    (store) => store.productCombine.productsReducer
  );
  const { orders, totalAmount } = useSelector(
    (store) => store.orderCombine.allOrdersReducer
  );
  const { users } = useSelector((store) => store.userCombine.allUsersReducer);
  let countOutOfStock = 0;

  products &&
    products.forEach((element) => {
      if (element.stock === 0) {
        countOutOfStock++;
      }
    });

  const lineData = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: ["blue"],
        hoverBackgroundColor: ["green"],
        data: [0, totalAmount],
      },
    ],
  };
  const doughnutData = {
    labels: ["Out Of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#db4141", "#54bf5b"],
        hoverBackgroundColor: ["#ff3737", "#85df5c"],
        data: [countOutOfStock, products?.length - countOutOfStock],
      },
    ],
  };

  useEffect(() => {
    // if(error){
    //   toast.error(error, {
    //     position: "top-center",
    //     autoClose: 2500,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //     transition: Bounce,
    //   });

    //   dispatch(adminProductsClearErrors());
    // }
    if (myParam === "true") {
      toast.success("Product Added Succesfully and routed", {
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
    if (myParam2 === "true") {
      toast.success("Product Deleted Successfully", {
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

    dispatch(getAdminProducts());
    dispatch(getAdminOrders());
    dispatch(getAdminUsers());
  }, [dispatch]);

  return (
    <>
      <MetaData title={"Dashboard"} />
      <div className={styles.mainPage}>
        <AdminSidebar />
        <div className={styles.outerContainer}>
          <div className={styles.headingBox}>
            <h1 className={styles.heading}>Admin's Dashboard</h1>
          </div>
          <hr className={styles.horizontalLine} />
          <div className={styles.dashboardBox}>
            <div className={styles.priceInformationBox}>
              <p className={styles.totalAmountHeading}>Total Amount: </p>
              <p className={styles.totalAmount}> ₹{totalAmount} </p>
            </div>
            <div className={styles.adminInformationBox}>
              <div className={styles.productBox}>
                <Link to={"/admin/products"}>
                  <p className={styles.productTitle}>Products</p>
                  <p className={styles.products}>{products?.length}</p>
                </Link>
              </div>

              <div className={styles.orderBox}>
                <Link to={"/admin/orders"}>
                  <p className={styles.orderTitle}>Orders</p>
                  <p className={styles.orders}>{orders?.length}</p>
                </Link>
              </div>

              <div className={styles.userBox}>
                <Link to={"/admin/users"}>
                  <p className={styles.userTitle}>Users</p>
                  <p className={styles.users}>{users?.length}</p>
                </Link>
              </div>
            </div>
            <div className={styles.chartContainer}>
              <div className={styles.chartHeadingBox}>
                <h1 className={styles.chartHeading}>Amount Chart</h1>
              </div>
              <div className={styles.chartBox}>
                <Line
                  options={{ maintainAspectRatio: false }}
                  className={styles.chart}
                  data={lineData}
                />
              </div>
            </div>

            <div className={styles.doughnutContainer}>
              <div className={styles.chartHeadingBox}>
                <h1 className={styles.chartHeading}>Stock Chart</h1>
              </div>
              <div className={styles.doughnutBox}>
                <Doughnut className={styles.doughnut} data={doughnutData} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer containerId={"admin_dashboard"}/>
    </>
  );
};

export default Dashboard;
