import React, { useEffect } from "react";
import styles from "./AdminProducts.module.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "../layouts/LoadingPage/Loading";
import { DataGrid } from "@mui/x-data-grid";
import ProductCard from "../layouts/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layouts/MetaData/MetaData";
import AdminSidebar from "../layouts/AdminSidebar/AdminSidebar";
import { Link, useNavigate } from "react-router-dom";
import {
  adminProductsClearErrors,
  deleteProduct,
  deleteProductClearErrors,
  getAdminProducts,
} from "../../actions/productAction";
import "./AdminProducts.css";
import { DELETE_PRODUCT_RESET } from "../../reducers/productReducer";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector(
    (store) => store.productCombine.productsReducer
  );
  const {
    product,
    error: deleteProductError,
    isDeleted,
  } = useSelector((store) => store.productCombine.productReducer);

  const rows = [];
  const columns = [
    {
      field: "id",
      headerName: "Product Id",
      minWidth: 230,
      flex: 0.2,
      cellClassName: `${styles.idColumn}`,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 300,
      flex: 1.3,
      cellClassName: `${styles.nameColumn}`,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 100,
      flex: 0.1,
      cellClassName: `${styles.stockColumn}`,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 150,
      flex: 0.2,
      cellClassName: `${styles.priceColumn}`,
    },

    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 120,
      flex: 0.1,
      sortable: false,
      cellClassName: `${styles.actionsColumn}`,
      renderCell: (params) => {
        return (
          <>
            <Link
              className={styles.link}
              to={`/admin/product/${params.row.id}`}
            >
              <EditNoteIcon className={styles.editProductIcon} />
            </Link>
            <button
              onClick={() => {
                deleteProductHandler(params.row.id);
              }}
              className={styles.button}
            >
              <DeleteIcon className={styles.deleteProductIcon} />
            </button>
          </>
        );
      },
    },
  ];
  products &&
    products.forEach((element) => {
      rows.push({
        id: element._id,
        stock: element.stock,
        price: element.price,
        name: element.name,
      });
    });

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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
      dispatch(adminProductsClearErrors());
    }

    if (deleteProductError) {
      toast.error(deleteProductError, {
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
      dispatch(deleteProductClearErrors());
    }

    if(isDeleted){
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
      dispatch(DELETE_PRODUCT_RESET());
      // navigate("/admin/dashboard?deletesuccess=true")

    }

    dispatch(getAdminProducts());
  }, [dispatch, toast, error, deleteProductError, isDeleted]);
  return (
    <>
    {loading ? <Loading/> : <>
      <MetaData title={"All Products"} />
      <div className={styles.mainPage}>
        <AdminSidebar />
        <div className={styles.outerContainer}>
          <div className={styles.headingBox}>
            <h1 className={styles.heading}>All Products</h1>
          </div>
          <hr className={styles.horizontalLine} />
          <div className={styles.productBox}>
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

      <ToastContainer containerId={"admin_products"} />
    </>}
    </>
  );
};

export default AdminProducts;
