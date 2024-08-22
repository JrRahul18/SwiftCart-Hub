import React, { useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../../layouts/LoadingPage/Loading";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({isAdmin, children }) => {
  const navigate = useNavigate();
  // console.log("entered in protectedROute")
  const { user, loading, isAuthenticated } = useSelector(
    (store) => store.userCombine.userReducer
  );
  // useEffect(()=>{
  //   if(!isAuthenticated){
  //     console.log("Hereee")
  //     navigate("/login");
  //   }
  // },[isAuthenticated])
  // if(!isAuthenticated){
  //   return <Navigate to={"/login"}/>
  // }
  // return loading === false ? children : null;
  return(
    <>
    {loading !== false ? <Loading/> : (isAdmin && isAdmin === true) && user?.role !== 'admin' ? <Navigate to={"/login"}/> : isAuthenticated === false ? <Navigate to={"/login"}/> : children  }
    </>
  )
};

export default ProtectedRoute;
