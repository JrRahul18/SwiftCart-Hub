import React, { useEffect } from "react";
import styles from "./AdminUsers.module.css";
import "./AdminUsers.css";
import MetaData from "../layouts/MetaData/MetaData";
import AdminSidebar from "../layouts/AdminSidebar/AdminSidebar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import {
  adminUsersClearError,
  deleteUser,
  deleteUserClearErrors,
  getAdminUsers,
} from "../../actions/userAction";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "../layouts/LoadingPage/Loading";
import { DELETE_USER_RESET } from "../../reducers/userReducer";

const AdminUsers = () => {
  const query = new URLSearchParams(window.location.search)
  const myParam = query.get("userEditSuccess");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector(
    (store) => store.userCombine.allUsersReducer
  );

  const {
    error: deleteUserError,
    isDeleted,
    message,
  } = useSelector((store) => store.userCombine.userProfileReducer);

  const rows = [];
  const columns = [
    {
      field: "id",
      headerName: "User Id",
      minWidth: 230,
      flex: 0.6,
      cellClassName: `${styles.idColumn}`,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 230,
      flex: 0.6,
      cellClassName: `${styles.emailColumn}`,
    },
    // {
    //   field: "email",
    //   headerName: "Email",
    //   minWidth: 230,
    //   flex: 0.6,
    //   cellClassName: `${styles.nameColumn}`,
    // },
    {
      field: "name",
      headerName: "Name",
      //   type: "number",
      minWidth: 140,
      flex: 0.4,
      cellClassName: `${styles.nameColumn}`,
    },
    {
      field: "role",
      headerName: "Role",
      //   type: "number",
      minWidth: 100,
      flex: 0.2,
    //   cellClassName: `${styles.roleColumn}`,
      cellClassName: (params) => {
        return params.row.role === "admin"
          ? `${styles.admin}`
          : `${styles.user}`;
      },
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
            <Link className={styles.link} to={`/admin/user/${params.row.id}`}>
              <EditNoteIcon className={styles.editUserIcon} />
            </Link>
            <button
              onClick={() => {
                deleteUserHandler(params.row.id);
              }}
              className={styles.button}
            >
              <DeleteIcon className={styles.deleteUserIcon} />
            </button>
          </>
        );
      },
    },
  ];
  users &&
    users.forEach((element) => {
      rows.push({
        id: element._id,
        email: element.email,
        role: element.role,
        name: element.name,
      });
    });

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
    // dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if(myParam === "true"){
      toast.success("User Updated Successfully", {
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
      dispatch(adminUsersClearError());
    }

    if (deleteUserError) {
      toast.error(deleteUserError, {
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
      dispatch(deleteUserClearErrors());
    }

    if (isDeleted) {
      toast.success(message, {
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
      dispatch(DELETE_USER_RESET());
      //   navigate("/admin/dashboard?deletesuccess=true");
    }

    dispatch(getAdminUsers());
  }, [dispatch, toast, error, deleteUserError, isDeleted, message]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={"All Users"} />
          <div className={styles.mainPage}>
            <AdminSidebar />
            <div className={styles.outerContainer}>
              <div className={styles.headingBox}>
                <h1 className={styles.heading}>All Users</h1>
              </div>
              <hr className={styles.horizontalLine} />

              <div className={styles.usersBox}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  className={styles.userTable}
                  autoHeight
                  pageSize={10}
                  disableRowSelectionOnClick
                />
              </div>
            </div>
          </div>
          <ToastContainer containerId={"admin_allUsers"} />
        </>
      )}
    </>
  );
};

export default AdminUsers;
