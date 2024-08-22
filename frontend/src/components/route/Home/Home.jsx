import React, { Fragment, useEffect } from "react";
import styles from "./Home.module.css";
import { FaMouse } from "react-icons/fa";
import { getProduct, clearErrors } from "../../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../layouts/MetaData/MetaData";
import Loading from "../../layouts/LoadingPage/Loading";
import {ToastContainer, toast, Bounce} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import bannerBackground from "./swiftCart_bg.jpg";
import ProductCard from "../../layouts/ProductCard/ProductCard";
import logo from "./logo.png"
// import { useAlert } from "react-alert";

const Home = () => {

  // const alert = useAlert();
  const dispatch = useDispatch();
  const getProds = useSelector((store) => store.productCombine.productsReducer.products);
  const getLoading = useSelector((store) => store.productCombine.productsReducer.loading);
  const getError = useSelector((store) => store.productCombine.productsReducer.error)
  // console.log("getLoading: ", getLoading);
  // console.log("Product at frontend: ", getProds);
  // console.log("Error: ", getError);
  // console.log(useSelector((store)=>store))

  useEffect(()=>{
    dispatch(getProduct(null))
  },[dispatch])

  useEffect(() => {
    if(getError){
      // alert.error(getError)
      // window.alert(getError)
      toast.error(getError, {
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
        // console.log(getError)
        dispatch(clearErrors())
    }
    // dispatch(getProduct(null));
  }, [dispatch, getError]);

  

  return <>
  {getLoading ? <Loading/> : <>
        <MetaData title="SwiftCart Hub"></MetaData>

        <div className={styles.outerContainer}>
          <div className={styles.mainBanner}>
            <div className={styles.logoBox}>
            <img className={styles.logo} src={logo} alt="" />

            </div>
            <h1>Welcome to SwiftCart Hub</h1>
            <h3>Find Products Below</h3>

            <a href="#ourProducts">
              <button>
                Scroll <FaMouse style={{ marginLeft: "6px" }} />
              </button>
            </a>
          </div>
          <div id="ourProducts" className={styles.box1}>
            <h2>Our Latest Products</h2>
            <hr />
          </div>
          <div className={styles.productContainer} id="productContainer">
            {getProds &&
              getProds.map((product) => (
                <ProductCard key={product._id} productData={product} />
              ))}
          </div>
        </div>
      </>}
      <ToastContainer containerId={"home"}/>
  </>;
};

export default Home;
