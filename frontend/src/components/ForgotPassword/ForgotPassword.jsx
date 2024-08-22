import React, { useState, useEffect } from "react";
import styles from "./ForgotPassword.module.css";
import MetaData from "../layouts/MetaData/MetaData";
import { CgMail, CgPassword } from "react-icons/cg";

import { Link, useAsyncError } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPasswordClearErrors,
  getLoadUser,
  postForgotPassword,
  putUpdatePassword,
  putUpdateProfile,
  updatePasswordClearErrors,
} from "../../actions/userAction";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  UPDATE_PASSWORD_RESET,
  UPDATE_RESET,
} from "../../reducers/userReducer";
import Loading from "../layouts/LoadingPage/Loading";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const { error, isUpdated, message } = useSelector(
    (store) => store.userCombine.forgotPasswordReducer
  );

  const forgetPasswordSubmitHandler = (event) => {
    event.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);

    dispatch(postForgotPassword(myForm));
  };

  useEffect(() => {
    //   console.log("ERROR: ", error, "Loading: ", loading, "isAuthenticated", isAuthenticated)
    if (error) {
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
      dispatch(forgotPasswordClearErrors());
      // dispatch(loginClearErrors())
    }
    if (message) {
      // console.log("Notification");
      toast.success(message, {
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
    }
  }, [dispatch, error, toast, message]);
  return (
    <>
      <MetaData title={"Forgot Password"} />
      <div className={styles.outerContainer}>
        <div className={styles.headingBox}>
          <h1 className={styles.heading}>Forgot Password</h1>
        </div>
        <hr className={styles.horizontalLine}/>
        <div className={styles.updateBox}>
          <form
            action=""
            className={`${styles.signupForm} ${styles.hide}`}
            onSubmit={forgetPasswordSubmitHandler}
          >
            <div className={styles.emailInputBox}>
              <CgMail className={styles.emailIcon} />
              <input
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className={styles.emailInput}
                type="email"
                placeholder="Enter Your Email"
              />
            </div>
            <div className={styles.signupButtonBox}>
              <button className={styles.signupButton}>Forget </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer containerId={"forgot_password"}/>
    </>
  );
};

export default ForgotPassword;
