import React, { useEffect, useRef, useState } from "react";
import styles from "./UpdateProfile.module.css";
import MetaData from "../layouts/MetaData/MetaData";
import { CgMail, CgPassword } from "react-icons/cg";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useAsyncError } from "react-router-dom";
import { FaIdCardAlt } from "react-icons/fa";
import { CiFaceSmile } from "react-icons/ci";
import avatarImg from "./avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { getLoadUser, putUpdateProfile, updateProfileClearErrors } from "../../actions/userAction";
// import { getLogin, loginClearErrors, getRegister, registerClearErrors } from "../../../actions/userAction";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { UPDATE_RESET } from "../../reducers/userReducer";
import Loading from "../layouts/LoadingPage/Loading";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector(
    (store) => store.userCombine.userReducer
  );
  const { error, isUpdated, loading } = useSelector(
    (store) => store.userCombine.userProfileReducer
  );
  const [name, setName]=useState("");
  const [email, setEmail]=useState("");
  const [profileImage, setProfileImage] = useState();
  const [profileImagePreview, setProfileImagePreview] = useState(avatarImg);

  const updateProfileSubmitHandler = (event) => {
    event.preventDefault();

    const newForm = new FormData();
    newForm.set("name", name);
    newForm.set("email", email);
    newForm.set("profileImage", profileImage);
    // console.log("SIGNUP USER STATE: ", userData)
    console.log("Update Form: ", newForm);
    dispatch(putUpdateProfile(newForm));
  };

  const updateProfileInputChangeHandler = (event) => {
      const imageReader = new FileReader();

      imageReader.onload = () => {
        if (imageReader.readyState === 2) {
          setProfileImagePreview(imageReader.result);
          setProfileImage(imageReader.result);
        }
      };
      imageReader.readAsDataURL(event.target.files[0]);
    
  };
  useEffect(() => {
    //   console.log("ERROR: ", error, "Loading: ", loading, "isAuthenticated", isAuthenticated)
    if(user){
        setName(user.name)
        setEmail(user.email);
        setProfileImage(user.profileImage?.url)

    }
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
      dispatch(updateProfileClearErrors())
      // dispatch(loginClearErrors())
    }
    if (isUpdated) {
      console.log("Notification")
      toast.success("Profile Updated Successfully", {
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
      dispatch(getLoadUser());
      navigate("/my-account");
      dispatch(UPDATE_RESET());
    }
  }, [dispatch, error, navigate, isUpdated, user]);
  return (
    <>
    {loading ? <Loading/> : <>
    <MetaData title={"Update Profile"}/>
      <div className={styles.outerContainer}>
        <div className={styles.headingBox}>
            <h1 className={styles.heading}>Update Profile</h1>
        </div>
        <div className={styles.updateBox}>
        <form encType="multipart/form-data" action="" className={`${styles.signupForm} ${styles.hide}`} onSubmit={updateProfileSubmitHandler}>
                <div className={styles.nameInputBox}>
                  <FaIdCardAlt className={styles.nameIcon}/>
                  <input name="name" value={name} onChange={(event)=> setName(event.target.value)} required type="text" className={styles.nameInput} placeholder="Enter Your Name"/>
                </div>
                <div className={styles.emailInputBox}>
                  <CgMail className={styles.emailIcon}/>
                  <input name="email" value={email} onChange={(event)=> setEmail(event.target.value)} required className={styles.emailInput} type="email" placeholder="Enter Your Email" />
                </div>
                <div className={styles.imageInputBox}>
                  {/* <CiFaceSmile className={styles.imageIcon}/> */}
                  <div className={styles.profileImageBox}>
                    <img src={profileImage} className={styles.profileImage} alt="" />
                  </div>
                  <input name="profileImage" onChange={updateProfileInputChangeHandler} className={styles.imageInput} type="file" accept="image/"/>
                </div>
                <div className={styles.signupButtonBox}>
                  <button disabled={loading ? true : false} className={styles.signupButton}>Update Profile</button>
                </div>
              </form>
        </div>
      </div>
      <ToastContainer containerId={"update_profile"}/>
    </>}
    </>
  );
};

export default UpdateProfile;
