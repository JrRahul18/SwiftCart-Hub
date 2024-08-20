import React, { useEffect, useRef, useState } from "react";
import styles from "./UpdatePassword.module.css";
import MetaData from "../layouts/MetaData/MetaData";
import { CgMail, CgPassword } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlinePassword } from "react-icons/md";
import { MdLockOpen } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";

import { Link, useAsyncError } from "react-router-dom";
import { FaIdCardAlt } from "react-icons/fa";
import { CiFaceSmile } from "react-icons/ci";
import avatarImg from "./avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { getLoadUser, putUpdatePassword, putUpdateProfile, updatePasswordClearErrors } from "../../actions/userAction";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET, UPDATE_RESET } from "../../reducers/userReducer";
import Loading from "../layouts/LoadingPage/Loading";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector(
    (store) => store.userCombine.userReducer
  );
  const { error, isUpdated, loading } = useSelector(
    (store) => store.userCombine.userProfileReducer
  );

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const updatePasswordSubmitHandler = (event) => {
    event.preventDefault();
    const myForm = new FormData();
    myForm.set("currentPassword", currentPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(putUpdatePassword(myForm))
  };


  useEffect(() => {
    //   console.log("ERROR: ", error, "Loading: ", loading, "isAuthenticated", isAuthenticated)
    if (error) {
      console.log("Password eror: ", error)
      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      dispatch(updatePasswordClearErrors());
      // dispatch(loginClearErrors())
    }
    if (isUpdated) {
      console.log("Notification");
      toast.success("Password Changed Successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      navigate("/my-account");
      dispatch(UPDATE_PASSWORD_RESET())
      // dispatch(UPDATE_RESET());
    }
  }, [dispatch, error, navigate, isUpdated, user]);
  return (
    <>
      <MetaData title={"Change Password"} />
      <div className={styles.outerContainer}>
      <div className={styles.headingBox}>
            <h1 className={styles.heading}>Change Password</h1>
        </div>
        <div className={styles.updateBox}>
        <form action="" className={`${styles.signupForm} ${styles.hide}`} onSubmit={updatePasswordSubmitHandler}>
                <div className={styles.passwordInputBox}>
                  <MdOutlinePassword className={styles.passwordIcon}/>
                  <input name="password" value={currentPassword} onChange={(event)=>setCurrentPassword(event.target.value)} required className={styles.passwordInput} type="password" placeholder="Enter Old Password" />
                </div>
                <div className={styles.passwordInputBox}>
                  <MdLockOpen className={styles.passwordIcon}/>
                  <input name="password" value={newPassword} onChange={(event)=>setNewPassword(event.target.value)} required className={styles.passwordInput} type="password" placeholder="Enter New Password" />
                </div>
                <div className={styles.passwordInputBox}>
                  <MdLockOutline className={styles.passwordIcon}/>
                  <input name="password" value={confirmPassword} onChange={(event)=>setConfirmPassword(event.target.value)} required className={styles.passwordInput} type="password" placeholder="Confirm New Password" />
                </div>
                <div className={styles.signupButtonBox}>
                  <button disabled={loading ? true : false} className={styles.signupButton}>Change Password</button>
                </div>
              </form>
        </div>
      </div>
      <ToastContainer containerId={"update_password"}/>
    </>
  );
};

export default UpdatePassword;
