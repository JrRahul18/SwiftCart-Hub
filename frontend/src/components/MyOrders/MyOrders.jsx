import React, { useEffect } from "react";
import styles from "./MyOrders.module.css";
import "./MyOrders.css"
import { DataGrid } from "@mui/x-data-grid";
import MetaData from "../layouts/MetaData/MetaData";
import { ToastContainer, toast, Bounce } from "react-toastify";
import LaunchIcon from "@mui/icons-material/Launch";
import { Link } from "react-router-dom";
import Loading from "../layouts/LoadingPage/Loading";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { getMyOrders, myOrdersClearErrors } from "../../actions/orderAction";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector(
    (store) => store.orderCombine.myOrdersReducer
  );
  const { user } = useSelector((store) => store.userCombine.userReducer);
  const rows = [];
  const columns = [
    { field: "id", headerName: "OrderID", minWidth: 230, flex: 0.6, cellClassName: `${styles.idColumn}` },
    { field: "status", headerName: "OrderStatus", minWidth: 140, flex: 0.4, cellClassName: (params)=>{
      return (params.row.status === "Processing" ? `${styles.processing}` : `${styles.delivered}` )
    } },
    {
      field: "itemQuantity",
      headerName: "Items Quantity",
      type: "number",
      minWidth: 170,
      flex: 0.4,
      
    },
    {
      field: "amount",
      headerName: "Total Amount",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 120,
      flex: 0.3,
      sortable: false,
      renderCell: (params) =>{
        return (
          <Link className={styles.link} to={`/order/${params.row.id}`}><LaunchIcon className={styles.toOrderIcon}/></Link>
        )
      }
    },
  ];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemQuantity: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

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
      dispatch(myOrdersClearErrors());
    }

    dispatch(getMyOrders());
  }, [error, dispatch, toast]);

  return (
    <>
      <MetaData title={`${user.name} - Orders`} />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.outerContainer}>
            <div className={styles.headingBox}>
              <h1 className={styles.heading}>My Orders</h1>
            </div>
            <hr className={styles.horizontalLine} />
            <div className={styles.myOrdersBox}>
              <DataGrid
                className={styles.ordersTable}
                autoHeight
                rows={rows}
                columns={columns}
                pageSize={10}
                disableRowSelectionOnClick
              />

              <div className={styles.subheadingContainer}>
                <p className={styles.subheading}> {`${user.name}'s Orders`} </p>
              </div>
            </div>
          </div>
        </>
      )}
      <ToastContainer containerId={"my_orders"} />
    </>
  );
};

export default MyOrders;
