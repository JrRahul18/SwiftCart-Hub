import React, { useEffect, useState } from "react";
import styles from "./AdminReviews.module.css";
import "./AdminReviews.css";
import AdminSidebar from "../layouts/AdminSidebar/AdminSidebar";
import MetaData from "../layouts/MetaData/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import Loading from "../layouts/LoadingPage/Loading";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { DELETE_REVIEW_RESET } from "../../reducers/productReducer";
import {
  adminReviewsClearError,
  deleteReview,
  deleteReviewClearError,
  getAdminReviews,
} from "../../actions/productAction";
import { FaStar } from "react-icons/fa";

const AdminReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productId, setProductId] = useState("");
  const { isDeleted, error: deleteReviewError } = useSelector(
    (store) => store.productCombine.reviewReducer
  );
  const { error, reviews, loading } = useSelector(
    (store) => store.productCombine.productReviewsReducer
  );

  const rows = [];
  const columns = [
    {
      field: "id",
      headerName: "Review Id",
      minWidth: 200,
      flex: 0.3,
      cellClassName: `${styles.idColumn}`,
    },
    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.3,
      cellClassName: `${styles.nameColumn}`,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 250,
      flex: 1,
      cellClassName: `${styles.commentColumn}`,
      renderCell: (params) => {
        return <p className={styles.comment}>{params.row.comment}</p>;
      },
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 95,
      flex: 0.1,
      cellClassName: (params) => {
        return params.row.rating >= 3
          ? `${styles.greenRating}`
          : `${styles.redRating}`;
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 80,
      flex: 0.1,
      sortable: false,
      cellClassName: `${styles.actionsColumn}`,
      renderCell: (params) => {
        return (
          <>
            <button
              onClick={() => {
                deleteProductReviewHandler(params.row.id);
              }}
              className={styles.button}
            >
              <DeleteIcon className={styles.deleteReviewIcon} />
            </button>
          </>
        );
      },
    },
  ];
  reviews &&
    reviews.forEach((element) => {
      rows.push({
        id: element._id,
        rating: element.rating,
        comment: element.comment,
        user: element.name,
      });
    });

  const deleteProductReviewHandler = (id) => {
    dispatch(deleteReview(id, productId));
  };

  const productReviewSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(getAdminReviews(productId));
  };

  useEffect(() => {
    if (error) {
      console.log("error: ", error);
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
      dispatch(adminReviewsClearError());
    }

    if (deleteReviewError) {
      toast.error(deleteReviewError, {
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
      dispatch(deleteReviewClearError());
    }

    if (isDeleted) {
      toast.success("Review Deleted Successfully", {
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
      dispatch(DELETE_REVIEW_RESET());
      dispatch(getAdminReviews(productId))
      navigate("/admin/reviews");
    }

    // dispatch(getAdminProducts());
  }, [dispatch, toast, error, deleteReviewError, isDeleted, navigate]);

  return (
    <>
      <MetaData title={"All Reviews"} />
      <div className={styles.mainPage}>
        <AdminSidebar />
        <div className={styles.outerContainer}>
          <div className={styles.headingBox}>
            <h1 className={styles.heading}>All Reviews</h1>
          </div>
          <hr className={styles.horizontalLine} />
          <div className={styles.updateReviewsBox}>
            <form
              encType="multipart/form-data"
              action=""
              className={styles.updateReviewsForm}
              onSubmit={productReviewSubmitHandler}
            >
              <div className={styles.headingBox}>
                <h2 className={styles.heading}>Update User Information</h2>
              </div>

              <div className={styles.productIdInputBox}>
                <FaStar className={styles.productIdIcon} />
                <input
                  name="name"
                  value={productId}
                  onChange={(event) => {
                    setProductId(event.target.value);
                  }}
                  required
                  type="text"
                  className={styles.productIdInput}
                  placeholder="Enter Product Id"
                />
              </div>

              <div className={styles.updateReviewsButtonBox}>
                <button
                  disabled={
                    loading ? true : false || productId === "" ? true : false
                  }
                  className={styles.updateReviewsButton}
                >
                  Find Product
                </button>
              </div>
            </form>
          </div>
          <div className={styles.productReviewsBox}>
            <div className={styles.headingBox}>
              <h1 className={styles.heading}>Reviews</h1>
            </div>
            {reviews && reviews.length > 0 ? (
              <>
                {loading ? (
                  <Loading />
                ) : (
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    className={styles.productReviewsTable}
                    autoHeight
                    pageSize={10}
                    disableRowSelectionOnClick
                  />
                )}
              </>
            ) : (
              <h1 className={styles.noReviewsHeading}>No Reviews Found</h1>
            )}
          </div>
        </div>
      </div>
      <ToastContainer containerId={"admin_reviews"} />
    </>
  );
};

export default AdminReviews;
