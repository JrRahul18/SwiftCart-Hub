import { useState, useEffect } from "react";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";
import Header from "./components/layouts/Header/Header";
import WebFont from "webfontloader";
import Footer from "./components/layouts/Footer/Footer";
import styles from "./App.module.css";
import Home from "./components/route/Home/Home";
import MetaData from "./components/layouts/MetaData/MetaData";
import Loading from "./components/layouts/LoadingPage/Loading";
// import ProductDetails from "./components/ProductDetails/ProductDetails";
import ProductDetails from "./components/layouts/ProductDetails/ProductDetails";
import Products from "./components/route/Products/Products";
import About from "./components/route/About/About"
import Login from "./components/route/Login/Login";
import {store} from "./store"
import { getLoadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import UserOptions from "./components/layouts/Header/UserOptions";
import MyProfile from "./components/MyProfile/MyProfile";
import ProtectedRoute from "./components/route/ProtectedRoute/ProtectedRoute";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Cart from "./components/route/Cart/Cart";
import Shipping from "./components/Shipping/Shipping";
import ConfirmOrder from "./components/ConfirmOrder/ConfirmOrder";
import axios from "axios";
import Payment from "./components/Payment/Payment";
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import OrderSuccess from "./components/OrderSuccess/OrderSuccess";
import MyOrders from "./components/MyOrders/MyOrders";
import OrderDetails from "./components/layouts/OrderDetails/OrderDetails";
import Dashboard from "./components/Dashboard/Dashboard";
import AdminProducts from "./components/AdminProducts/AdminProducts";
import NewProduct from "./components/NewProduct/NewProduct";
import UpdateProduct from "./components/UpdateProduct/UpdateProduct";
import AdminOrders from "./components/AdminOrders/AdminOrders";
import UpdateOrder from "./components/UpdateOrder/UpdateOrder";
import AdminUsers from "./components/AdminUsers/AdminUsers";
import UpdateUser from "./components/UpdateUser/UpdateUser";
import AdminReviews from "./components/AdminReviews/AdminReviews";
import ContactUs from "./components/route/ContactUs/ContactUs";
import ScrollToTop from "./components/layouts/ScrollToTop/ScrollToTop";
import PageNotFound from "./components/layouts/PageNotFound/PageNotFound";

// React.useEffect(() =>{
//   WebFont.load({google:{ families:['Roboto', 'Droid Sans', 'Chilanka']}})
// }, [])

function App() {
  // ScrollToTop();
  const{user, isAuthenticated}=useSelector((store)=> store.userCombine.userReducer);
  console.log("USER app.jsx: ", user, " isAuthenticated: ", isAuthenticated)

  const[stripeAPI, setStripeAPI]=useState("")
  // console.log("Stripe API Key: ", stripeAPI)


  async function getStripeAPI(){
    // const {data} = await axios.get("http://localhost:4000/api/v1/stripeAPI", {withCredentials: true});

    const data = (await axios.get(`http://localhost:4000/api/v1/stripeAPI`, {withCredentials: true})).data;
    setStripeAPI(data.stripeAPIKey);
  }

  useEffect(() => {
    WebFont.load({
      google: { families: ["Roboto", "Droid Sans", "Chilanka"] },
    });
    store.dispatch(getLoadUser());
    

    getStripeAPI();
  }, []);
  return (
    <div className={styles.appBox}>
      <MetaData title="SwiftCart Hub"></MetaData>
      <Router>
        <ScrollToTop/>
      {isAuthenticated && <UserOptions user={user}/>}
        <Header />
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/temp" element={<Loading/>}/>
          <Route path="/product/:id" element={<ProductDetails/>} />
          <Route path="/products" element={<Products/>}/>
          <Route path="/products/:keyword" element={<Products/>}/>
          <Route path="/about-us" element={ <About/> }/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/update-profile" element={<ProtectedRoute> <UpdateProfile/> </ProtectedRoute>}/>
          <Route path="/my-account" element={<ProtectedRoute> <MyProfile/> </ProtectedRoute>}/>
          <Route path="/password/change-password" element={<ProtectedRoute> <UpdatePassword/> </ProtectedRoute>} />
          <Route path="/password/forget-password" element={ <ForgotPassword/> }/>
          <Route path="/password/reset/:token" element={<ResetPassword/>} />
          <Route path="/my-cart" element={<Cart/>} />
          <Route path="/shipping" element={<ProtectedRoute> <Shipping/> </ProtectedRoute>} />
          <Route path="/order/confirm" element={<ProtectedRoute> <ConfirmOrder/> </ProtectedRoute>} />
          <Route path="/contact-us" element={<ContactUs/>}/>

          {stripeAPI 
          && 
            <Route path="/process/payment" element={ <Elements stripe={loadStripe(stripeAPI)}> <ProtectedRoute> <Payment/> </ProtectedRoute> </Elements>} />
            }
          
          <Route path="/success" element={<ProtectedRoute> <OrderSuccess/> </ProtectedRoute>}/>
          <Route path="/my-orders" element={ <ProtectedRoute><MyOrders/></ProtectedRoute>  }/>
          <Route path="/order/:id" element={<ProtectedRoute> <OrderDetails/> </ProtectedRoute>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin={true}> <Dashboard/> </ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute isAdmin={true}> <AdminProducts/> </ProtectedRoute>} />
          <Route path="/admin/product" element={<ProtectedRoute isAdmin={true}> <NewProduct/> </ProtectedRoute>}/>
          <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true}> <UpdateProduct/> </ProtectedRoute>}/>
          <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true}> <AdminOrders/> </ProtectedRoute>}/>
          <Route path="/admin/order/:id" element={<ProtectedRoute isAdmin={true}> <UpdateOrder/> </ProtectedRoute>}/>
          <Route path="/admin/users" element={<ProtectedRoute isAdmin={true}> <AdminUsers/> </ProtectedRoute>}/>
          <Route path="/admin/user/:id" element={<ProtectedRoute isAdmin={true}> <UpdateUser/> </ProtectedRoute>}/>
          <Route path="/admin/reviews" element={<ProtectedRoute isAdmin={true}> <AdminReviews/> </ProtectedRoute>}/>

          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
        <Footer />
        <ToastContainer/>
      </Router>
    </div>
  );
}

export default App;
