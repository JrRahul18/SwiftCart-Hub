import React, { useEffect } from "react";
import "./AdminOrders.css";
import styles from "./AdminOrders.module.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid } from "@mui/x-data-grid";
import AdminSidebar from "../layouts/AdminSidebar/AdminSidebar";
import MetaData from "../layouts/MetaData/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  adminOrdersClearErrors,
  deleteOrder,
  deleteOrderClearErrors,
  getAdminOrders,
} from "../../actions/orderAction";
import { Link } from "react-router-dom";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { DELETE_ORDER_RESET } from "../../reducers/orderReducer";
import Loading from "../layouts/LoadingPage/Loading";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loading, error } = useSelector(
    (store) => store.orderCombine.allOrdersReducer
  );
  const { error: deleteOrderError, isDeleted } = useSelector(
    (store) => store.orderCombine.orderReducer
  );

  const rows = [];
  const columns = [
    {
      field: "id",
      headerName: "OrderID",
      minWidth: 230,
      flex: 0.6,
      cellClassName: `${styles.idColumn}`,
    },
    {
      field: "status",
      headerName: "OrderStatus",
      minWidth: 140,
      flex: 0.4,
      cellClassName: (params) => {
        return params.row.status === "Processing"
          ? `${styles.processing}`
          : `${styles.delivered}`;
      },
    },
    {
      field: "itemQuantity",
      headerName: "Items Quantity",
      type: "number",
      minWidth: 170,
      flex: 0.4,
      cellClassName: `${styles.itemsQuantityColumn}`,
    },
    {
      field: "amount",
      headerName: "Total Amount",
      type: "number",
      minWidth: 150,
      flex: 0.4,
      cellClassName: `${styles.amountColumn}`,
    },

    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 120,
      flex: 0.3,
      sortable: false,
      cellClassName: `${styles.actionsColumn}`,
      renderCell: (params) => {
        return (
          <>
            <Link className={styles.link} to={`/admin/order/${params.row.id}`}>
              <EditNoteIcon className={styles.editOrderIcon} />
            </Link>
            <button
              onClick={() => {
                deleteOrderHandler(params.row.id);
              }}
              className={styles.button}
            >
              <DeleteIcon className={styles.deleteOrderIcon} />
            </button>
          </>
        );
      },
    },
  ];
  orders &&
    orders.forEach((element) => {
      rows.push({
        id: element._id,
        itemQuantity: element.orderItems.length,
        amount: element.totalPrice,
        status: element.orderStatus,
      });
    });

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
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
      dispatch(adminOrdersClearErrors());
    }

    if (deleteOrderError) {
      toast.error(deleteOrderError, {
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
      dispatch(deleteOrderClearErrors());
    }

    if (isDeleted) {
      toast.success("Order Deleted Successfully", {
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
      dispatch(DELETE_ORDER_RESET());
      // navigate("/admin/dashboard?orderDeleteDuccess=true")
    }

    dispatch(getAdminOrders());
  }, [dispatch, toast, error, deleteOrderError, isDeleted]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={"All Orders"} />
          <div className={styles.mainPage}>
            <AdminSidebar />
            <div className={styles.outerContainer}>
              <div className={styles.headingBox}>
                <h1 className={styles.heading}>All Orders</h1>
              </div>
              <hr className={styles.horizontalLine} />
              <div className={styles.orderBox}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  className={styles.productTable}
                  autoHeight
                  pageSize={10}
                  disableRowSelectionOnClick
                />
              </div>
            </div>
          </div>

          <ToastContainer containerId={"admin_orders"} />
        </>
      )}
    </>
  );
};

export default AdminOrders;
