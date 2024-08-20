import React, { useState, useEffect } from "react";
import styles from "./UserOptions.module.css";
import "./UserOptions.css"
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import avatar from "./avatar.png";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListAltIcon from "@mui/icons-material/ListAlt";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getLogout } from "../../../actions/userAction";
// import { tooltipClasses } from "@mui/material";

const UserOptions = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userDataFromReducer = useSelector(store => store.userCombine.userReducer);
  const {cartData} = useSelector(store => store.cartCombine.cartReducer);
  const speedDialActionArray = [
    { icon: <PersonIcon />, name: "Profile", navigateUrl: "/my-account" },
    { icon: <ShoppingCartIcon  style={{color: cartData.length >0 ? "var(--button-color)": "unset"}}/>, name: `Cart(${cartData.length})`, navigateUrl: "/my-cart"},
    { icon: <ListAltIcon />, name: "Orders", navigateUrl: "/my-orders" },
    { icon: <ExitToAppIcon />, name: "Logout", navigateUrl: "/logout" },
  ];
  if (props.user?.role === "admin") {
    speedDialActionArray.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      navigateUrl: "/admin/dashboard",
    });
  }

  const navigateHandler = (navigateUrl) => {
    if (navigateUrl === "/logout") {
      handleLogout();
    } else {
      navigate(navigateUrl);
    }
  };
  const handleLogout = () => {
    if(!toast.isActive("success")){
      toast.success("Logout Successfully", {
        toastId: "success",
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }

    dispatch(getLogout());
    console.log("userDataFromReducer: ", userDataFromReducer);
  };


  return (
    <>
      {/* <div className={styles.outerContainer}> */}
        {/* <Box
          className={styles.box}
          sx={{ minHeight: 300, transform: "translateZ(0px)", flexGrow: 1 }}
        > */}
          <Backdrop open={open} />
          <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            sx={{
              position: "fixed",
              // border: "1px solid gray",
              marginTop: 20,
              marginRight: "5px",
              right: 0,
              "& .MuiSpeedDial-fab": {
                backgroundColor: "transparent",
                boxShadow:" none",
                width: "60px",
                height: "60px",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              },
            }}
            icon={<img className={styles.imageIcon} src={props.user?.profileImage?.url ? props.user.profileImage.url : avatar}></img>}
            // icon={<img className={styles.imageIcon} src={avatar} alt="avatar"></img>}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction="down"
          >
            {speedDialActionArray.map((action) => (
              <SpeedDialAction
                className={styles.dialIcon}
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipOpen
                onClick={() => navigateHandler(action.navigateUrl)}
              />
            ))}
          </SpeedDial>
        {/* </Box> */}
      {/* </div> */}
      <ToastContainer containerId={"user_options"}/>

    </>
  );
};

export default UserOptions;
