import React, { useEffect } from 'react'
import styles from "./MyProfile.module.css"
import MetaData from '../layouts/MetaData/MetaData'
import { useSelector } from 'react-redux'
import avatar from "./avatar.png"
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../layouts/LoadingPage/Loading'

const MyProfile = () => {
  const navigate= useNavigate();
  const {user, loading, isAuthenticated} = useSelector(store=>store.userCombine.userReducer)
  console.log(user);
  const date = new Date(user.createdAt);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  useEffect(()=>{
    if(!isAuthenticated){
      navigate("/login");
    }
  },[isAuthenticated])
  return (
    <>
    {loading ? <Loading/> : <>
      <MetaData title={`${user?.name} | SwiftCart Hub`}></MetaData>

    <div className={styles.outerContainer}>
      <div className={styles.profileBox}>
        <div className={styles.headingBox}>
          <h1>My Profile</h1>
        </div>
        <hr className={styles.horizontalLine}/>
        <div className={styles.profileDisplayBox}>
          <div className={styles.profileImageBox}>
            <img className={styles.profileImage} src={user?.profileImage?.url} alt="" />
          </div>
          <div className={styles.nameBox}>
            <h1 className={styles.name}>Welcome, {user?.name ? user.name : "User"}</h1>
          </div>
        </div>
        <div className={styles.editProfileButtonBox}>
          <button className={styles.editProfileButton}>
          <Link to={'/update-profile'} className={styles.link}> Edit Profile</Link>

          </button>
        </div>
        <div className={styles.userDataBox}>
          <div className={styles.idBox}>
              <h4>Profile Id :</h4>
              <p style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>{user?._id}</p>
            </div>
            <div className={styles.nameBox}>
              <h4>Name :</h4>
              <p>{user?.name}</p>
            </div>
            <div className={styles.emailBox}>
              <h4>Email :</h4>
              <p>{user?.email}</p>
            </div>
            <div className={styles.roleBox}>
              <h4>Role :</h4>
              <p>{user?.role}</p>
            </div>
            <div className={styles.createdAtBox}>
              <h4>Created At : </h4>
              <p>{`${month} ${day}, ${year}`}</p>
            </div>
          </div>
          <div className={styles.buttonBox}>
            <button className={styles.myOrdersButton}>
              <Link to={"/my-orders"} className={styles.link}>Check My Orders</Link>
            </button>
            <button className={styles.resetPasswordButton}>
              <Link to={"/password/change-password"} className={styles.link}>Reset Password</Link>
            </button>
          </div>
        </div>
    </div>

    </>}
    </>
  )
}

export default MyProfile