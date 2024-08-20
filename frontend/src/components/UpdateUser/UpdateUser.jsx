import React, { useEffect, useState } from "react";
import styles from "./UpdateUser.module.css";
import AdminSidebar from "../layouts/AdminSidebar/AdminSidebar";
import MetaData from "../layouts/MetaData/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_USER_RESET } from "../../reducers/userReducer";
import { CgMail } from "react-icons/cg";
import { RiAdminLine } from "react-icons/ri";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

import {
  getUserDetails,
  putUpdateUser,
  updateUserClearErrors,
  userDetailsClearError,
} from "../../actions/userAction";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../layouts/LoadingPage/Loading";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myParams = useParams();

  const { loading, error, user } = useSelector(
    (store) => store.userCombine.userDetailsReducer
  );

  const {
    loading: updateUserLoading,
    error: updateUserError,
    isUpdated,
  } = useSelector((store) => store.userCombine.userProfileReducer);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedRole, setUpdatedRole] = useState("");

  useEffect(() => {
    if (user && user._id !== myParams.id) {
      console.log("userid: ", user._id, "myParamsid: ", myParams.id);
      dispatch(getUserDetails(myParams.id));
    } else {
      setUpdatedName(user.name);
      setUpdatedEmail(user.email);
      setUpdatedRole(user.role);
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
      dispatch(userDetailsClearError());
    }

    if (updateUserError) {
      toast.error(updateUserError, {
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
      dispatch(updateUserClearErrors());
    }

    if (isUpdated) {
      toast.success("User Updated succesfully", {
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
      dispatch(UPDATE_USER_RESET());
      navigate("/admin/users?userEditSuccess=truee");
    }
  }, [dispatch, toast, error, updateUserError, user, isUpdated, myParams.id]);

  const updateUserFormSubmitHandler = (event) => {
    event.preventDefault();

    const newForm = new FormData();

    newForm.set("name", updatedName);
    newForm.set("email", updatedEmail);
    newForm.set("role", updatedRole);

    dispatch(putUpdateUser(myParams.id, newForm));
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={"Update User"} />
          <div className={styles.mainPage}>
            <AdminSidebar />
            <div className={styles.outerContainer}>
              <div className={styles.headingBox}>
                <h1 className={styles.heading}>Update User</h1>
              </div>
              <hr className={styles.horizontalLine} />
              <div className={styles.updateUserBox}>
                <form
                  encType="multipart/form-data"
                  action=""
                  className={styles.updateUserForm}
                  onSubmit={updateUserFormSubmitHandler}
                >
                  <div className={styles.headingBox}>
                    <h2 className={styles.heading}>Update User Information</h2>
                  </div>

                  <div className={styles.nameInputBox}>
                    <MdOutlineDriveFileRenameOutline
                      className={styles.nameIcon}
                    />
                    <input
                      name="name"
                      value={updatedName}
                      onChange={(event) => {
                        setUpdatedName(event.target.value);
                      }}
                      required
                      type="text"
                      className={styles.nameInput}
                      placeholder="Enter User Name"
                    />
                  </div>

                  <div className={styles.emailInputBox}>
                    <CgMail className={styles.emailIcon} />
                    <input
                      name="email"
                      type="email"
                      value={updatedEmail}
                      onChange={(event) => {
                        setUpdatedEmail(event.target.value);
                      }}
                      required
                      className={styles.emailInput}
                      placeholder="Enter User Email"
                    />
                  </div>

                  <div className={styles.roleInputBox}>
                    <RiAdminLine className={styles.roleIcon} />
                    <select
                      value={updatedRole}
                      onChange={(event) => {
                        setUpdatedRole(event.target.value);
                      }}
                      className={styles.roleInput}
                      name="category"
                      id=""
                    >
                      <option disabled value="">
                        Enter User Category
                      </option>
                      <option className={styles.roleOptions} value="user">
                        user
                      </option>
                      <option className={styles.roleOptions} value="admin">
                        admin
                      </option>
                    </select>
                  </div>

                  <div className={styles.updateUserButtonBox}>
                    <button
                      disabled={
                        updateUserLoading
                          ? true
                          : false || updatedRole === ""
                          ? true
                          : false
                      }
                      className={styles.updateUserButton}
                    >
                      Update User
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <ToastContainer containerId={"admin_updateUser"} />
        </>
      )}
    </>
  );
};

export default UpdateUser;
