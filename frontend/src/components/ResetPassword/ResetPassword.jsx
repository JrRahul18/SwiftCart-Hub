import React, { useState, useEffect} from 'react'
import styles from "./ResetPassword.module.css"
import MetaData from "../layouts/MetaData/MetaData";
import { CgMail, CgPassword } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlinePassword } from "react-icons/md";
import { MdLockOpen } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";

import { Link, useAsyncError, useParams } from "react-router-dom";
import { FaIdCardAlt } from "react-icons/fa";
import { CiFaceSmile } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getLoadUser, putResetPassword, putUpdatePassword, putUpdateProfile, updatePasswordClearErrors } from "../../actions/userAction";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET, UPDATE_RESET } from "../../reducers/userReducer";
import Loading from "../layouts/LoadingPage/Loading";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const {token} = useParams();

 
  const { error, success, loading } = useSelector(
    (store) => store.userCombine.forgotPasswordReducer
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const resetPasswordSubmitHandler = (event) => {
    event.preventDefault();
    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(putResetPassword(token, myForm))
  };


  useEffect(() => {
    //   console.log("ERROR: ", error, "Loading: ", loading, "isAuthenticated", isAuthenticated)
    if (error) {
      console.log("Reset Password error: ", error)
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
    if (success) {
      console.log("Notification");
      toast.success("Password Reset Successfully", {
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
      navigate("/login");  
    }
  }, [dispatch, error, navigate, success, toast]);
  return (
    <>
      <MetaData title={"Reset Password"} />
      <div className={styles.outerContainer}>
      <div className={styles.headingBox}>
            <h1 className={styles.heading}>Change Password</h1>
        </div>
        <div className={styles.updateBox}>
        <form action="" className={`${styles.signupForm} ${styles.hide}`} onSubmit={resetPasswordSubmitHandler}>
                <div className={styles.passwordInputBox}>
                  <MdLockOpen className={styles.passwordIcon}/>
                  <input name="password" value={password} onChange={(event)=>setPassword(event.target.value)} required className={styles.passwordInput} type="password" placeholder="Enter New Password" />
                </div>
                <div className={styles.passwordInputBox}>
                  <MdLockOutline className={styles.passwordIcon}/>
                  <input name="password" value={confirmPassword} onChange={(event)=>setConfirmPassword(event.target.value)} required className={styles.passwordInput} type="password" placeholder="Confirm New Password" />
                </div>
                <div className={styles.signupButtonBox}>
                  <button disabled={loading ? true : false} className={styles.signupButton}>Update Password</button>
                </div>
              </form>
        </div>
      </div>
      <ToastContainer containerId={"reset_password"}/>
    </>
  )
}

export default ResetPassword