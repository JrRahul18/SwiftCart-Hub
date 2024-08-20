import React, { useEffect, useRef, useState } from "react";
import styles from "./Login.module.css";
import MetaData from "../../layouts/MetaData/MetaData";
import { CgMail, CgPassword } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useAsyncError, useLocation } from "react-router-dom";
import { FaIdCardAlt } from "react-icons/fa";
import { CiFaceSmile } from "react-icons/ci";
import avatarImg from "./avatar.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getLogin,
  loginClearErrors,
  getRegister,
  registerClearErrors,
} from "../../../actions/userAction";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../layouts/LoadingPage/Loading";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { error, loading, isAuthenticated } = useSelector(
    (store) => store.userCombine.userReducer
  );
  // const getUser = useSelector((store)=>store.userCombine.userReducer);
  // if(getUser !== null && getUser.user !== undefined){
  //   console.log("GETUSER: ", getUser)
  //   console.log("GETUSER(1): ", getUser?.user?.user?._id)
  // }

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    profileImage: "file",
  });
  const [profileImage, setProfileImage] = useState();
  const [profileImagePreview, setProfileImagePreview] = useState(avatarImg);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const loginForm = useRef(null);
  const signupForm = useRef(null);
  const switchButton = useRef("");

  const toggleHandler = (value) => {
    if (value === "login") {
      document.getElementById("loginFormButton").classList.add(styles.active);
      document
        .getElementById("signupFormButton")
        .classList.remove(styles.active);

      signupForm.current.classList.add(styles.hide);
      loginForm.current.classList.remove(styles.hide);
    }
    if (value === "register") {
      document.getElementById("signupFormButton").classList.add(styles.active);
      document
        .getElementById("loginFormButton")
        .classList.remove(styles.active);

      signupForm.current.classList.remove(styles.hide);
      loginForm.current.classList.add(styles.hide);
    }
  };
  const loginSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(getLogin(loginEmail, loginPassword));
  };

  const signupSubmitHandler = (event) => {
    event.preventDefault();

    const newForm = new FormData();
    newForm.set("name", user.name);
    newForm.set("email", user.email);
    newForm.set("password", user.password);
    newForm.set("profileImage", profileImage);
    console.log("SIGNUP USER STATE: ", user);
    console.log("SIGNUP FORM: ", newForm);
    dispatch(getRegister(newForm));
  };

  const loginEmailChangeHandler = (event) => {
    setLoginEmail(event.target.value);
  };
  const loginPasswordChangeHandler = (event) => {
    setLoginPassword(event.target.value);
  };

  const signupInputChangeHandler = (event) => {
    if (event.target.name === "profileImage") {
      const imageReader = new FileReader();
      imageReader.onload = () => {
        if (imageReader.readyState === 2) {
          setProfileImagePreview(imageReader.result);
          setProfileImage(imageReader.result);
        }
      };
      imageReader.readAsDataURL(event.target.files[0]);
    } else {
      setUser({ ...user, [event.target.name]: event.target.value });
    }
  };
  const redirect = location.search
    ? location.search.split("=")[1]
    : "my-account";
  // const redirect = location.search ? new URLSearchParams(location.search).get('redirect') : "my-account"

  useEffect(() => {
    console.log(
      "ERROR: ",
      error,
      "Loading: ",
      loading,
      "isAuthenticated",
      isAuthenticated
    );
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
      // dispatch(loginClearErrors())
    }
    if (isAuthenticated === true) {
      console.log("Logged In successfully");
      toast.success("Logged In Successfully", {
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
      navigate(`/${redirect}`);
    }
  }, [dispatch, error, isAuthenticated, navigate, redirect]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={"Login | SwiftCart Hub"} />
          <div className={styles.outerContainer}>
            <div className={styles.loginSignupBox}>
              <div className={styles.toggleBox}>
                <p
                  id="loginFormButton"
                  className={`${styles.loginFormButton} ${styles.active}`}
                  onClick={() => {
                    toggleHandler("login");
                  }}
                >
                  Login
                </p>
                <p
                  id="signupFormButton"
                  className={styles.signupFormButton}
                  onClick={() => {
                    toggleHandler("register");
                  }}
                >
                  Signup
                </p>
                {/* <button ref={switchButton}></button> */}
              </div>
              <div className={styles.formBox}>
                <form
                  action=""
                  className={styles.loginForm}
                  ref={loginForm}
                  onSubmit={loginSubmitHandler}
                >
                  <div className={styles.headingBox}>
                    <h2 className={styles.heading}>Login</h2>
                  </div>
                  <div className={styles.emailInputBox}>
                    <CgMail className={styles.emailIcon} />
                    <input
                      name="email"
                      value={loginEmail}
                      onChange={loginEmailChangeHandler}
                      required
                      className={styles.emailInput}
                      type="email"
                      placeholder="Enter Your Email"
                    />
                  </div>
                  <div className={styles.passwordInputBox}>
                    <RiLockPasswordLine className={styles.passwordIcon} />
                    <input
                      name="password"
                      value={loginPassword}
                      onChange={loginPasswordChangeHandler}
                      required
                      className={styles.passwordInput}
                      type="password"
                      placeholder="Enter Your Password"
                    />
                  </div>
                  <div className={styles.loginButtonBox}>
                    <button className={styles.loginButton}>Login</button>
                  </div>
                  <div className={styles.forgetPasswordBox}>
                    <Link to={"/password/forget-password"}>
                      Forget Password?
                    </Link>
                  </div>
                </form>

                <form
                  encType="multipart/form-data"
                  action=""
                  className={`${styles.signupForm} ${styles.hide}`}
                  ref={signupForm}
                  onSubmit={signupSubmitHandler}
                >
                  <div className={styles.headingBox}>
                    <h2 className={styles.heading}>Signup</h2>
                  </div>
                  <div className={styles.nameInputBox}>
                    <FaIdCardAlt className={styles.nameIcon} />
                    <input
                      name="name"
                      onChange={signupInputChangeHandler}
                      required
                      type="text"
                      className={styles.nameInput}
                      placeholder="Enter Your Name"
                    />
                  </div>
                  <div className={styles.emailInputBox}>
                    <CgMail className={styles.emailIcon} />
                    <input
                      name="email"
                      onChange={signupInputChangeHandler}
                      required
                      className={styles.emailInput}
                      type="email"
                      placeholder="Enter Your Email"
                    />
                  </div>
                  <div className={styles.passwordInputBox}>
                    <RiLockPasswordLine className={styles.passwordIcon} />
                    <input
                      name="password"
                      onChange={signupInputChangeHandler}
                      required
                      className={styles.passwordInput}
                      type="password"
                      placeholder="Enter Your Password"
                    />
                  </div>
                  <div className={styles.imageInputBox}>
                    {/* <CiFaceSmile className={styles.imageIcon}/> */}
                    <div className={styles.profileImageBox}>
                      <img
                        src={profileImagePreview}
                        className={styles.profileImage}
                        alt=""
                      />
                    </div>
                    <input
                      name="profileImage"
                      onChange={signupInputChangeHandler}
                      className={styles.imageInput}
                      type="file"
                      accept="image/"
                    />
                  </div>
                  <div className={styles.signupButtonBox}>
                    <button
                      disabled={loading ? true : false}
                      className={styles.signupButton}
                    >
                      Signup
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      <ToastContainer containerId={"user_login_signup"} />
    </>
  );
};

export default Login;
