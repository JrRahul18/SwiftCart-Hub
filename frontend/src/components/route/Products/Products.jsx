import React, { useEffect, useState, useCallback } from "react";
import styles from "./Products.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, clearErrors } from "../../../actions/productAction";
import Loading from "../../layouts/LoadingPage/Loading";
import ProductCard from "../../layouts/ProductCard/ProductCard";
import { useParams } from 'react-router-dom'
import MetaData from "../../layouts/MetaData/MetaData";
import ReactPaginate from 'react-paginate'
import Slider from "@mui/material/Slider"
import { Typography } from "@mui/material";
import { categoriesArray } from "./Category";
import {ToastContainer, toast, Bounce} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const Products = () => {
  const dispatch = useDispatch();
  const getKeyword = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory]=useState('');
  const [priceRange, setPriceRange] = useState([0, 25000])
  const [ratingRange, setRatingRange]=useState(0);


  const {products, loading, error, productsPerPage, productCount, filteredCount} = useSelector((store) => store.productCombine.productsReducer);

  // console.log("products: ", products, "loading: ", loading, "error: ", error, "productsPerPage: ", productsPerPage, "filteredCount: ",filteredCount)


  const pageChangeHandler =(event) =>{
    setCurrentPage(event.selected+1)
  }

  const priceRangeHandler = (event, currentPrice) =>{
    setPriceRange(currentPrice)
  }
  const categoryChangeHandler = (event) =>{
    if(event.target.value === 'All Products'){
      setCurrentCategory(null)
    }else{
      setCurrentCategory(event.target.value)

    }
  }
  const ratingChangeHandler = (event, currentRating) =>{
    setRatingRange(currentRating)
  }
  
  useEffect(() => {
    
    dispatch(getProduct(getKeyword, currentPage, priceRange, currentCategory, ratingRange));
    return () => {};
  }, [dispatch, getKeyword, currentPage, priceRange, currentCategory, ratingRange]);

  useEffect(()=>{
    if(error){
      // alert.error(getError)
      // window.alert(getError)
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
        dispatch(clearErrors())
    }
  },[dispatch, error])
  let count = filteredCount;

  return <>
  {loading ? <Loading/> : <>
    {/* <MetaData title={`${getProd.name} | SwiftCart Hub`}></MetaData> */}
    <MetaData title={`${(getKeyword !== null && getKeyword.keyword !== null && getKeyword.keyword !== undefined) ? `search: ${getKeyword.keyword}` : "Products | SwiftCart Hub"}`}></MetaData>
  <div className={styles.outerContainer}>
    <div className={styles.headingBox}>
      <h1 className={styles.heading}>Our Products</h1>
    </div>
    <hr className={styles.horizontalLine}/>
    <div className={styles.filterBox}>

      <div className={styles.priceFilterBox}>
        <div className={styles.priceHeading}>
          <Typography className={styles.heading}>Price Range</Typography>
        </div>
        <div className={styles.sliderBox}>
          <Slider classes={{thumb: styles.sliderThumb, track:styles.sliderTrack, rail: styles.sliderRail, mark: styles.sliderMark}} className={styles.slider} aria-labelledby="range-slider" marks step={1000} valueLabelDisplay="auto" value={priceRange} onChangeCommitted={priceRangeHandler} min={0} max={20000}/>
        </div>
      </div>
      <div className={styles.categoryFilterBox}>
        <div className={styles.categoriesHeading}>
          <Typography className={styles.heading}>Categories</Typography>
        </div>
        <div className={styles.optionBox}>
          <select className={styles.selectOption} value={currentCategory} onChange={categoryChangeHandler}>
          <option className={`${styles.option} ${styles.disabledOption}`} value="" disabled>Select Category</option>
          <option className={`${styles.option}`} >All Products</option>
            {categoriesArray.map((category, index)=>(
              <option className={styles.option} key={index}>{category}</option>
            ))}
          </select>
          {/* {currentCategory} */}
        </div>
      </div>
      <div className={styles.ratingFilterBox}>
        <div className={styles.ratingsHeading}>
          <Typography className={styles.heading}>Ratings above: </Typography>
        </div>
        <div className={styles.ratingBox}>
          <Slider className={styles.slider} classes={{thumb: styles.sliderThumb, track:styles.sliderTrack, rail: styles.sliderRail, mark: styles.sliderMark}} value={ratingRange} marks valueLabelDisplay="auto" onChangeCommitted={ratingChangeHandler} aria-labelledby="continous-slider" min={0} max={5}/>
        </div>
      </div>
    </div>
    <div className={styles.productBox}>
        {products && products.map((prod, index)=>(<ProductCard key={prod._id} productData={prod}/>))}
      </div>
    
      {productsPerPage < count && <div className={styles.paginationBox}>
        <ReactPaginate forcePage={currentPage-1} activeClassName={styles.activePage} className={styles.paginateContainer} onPageChange={pageChangeHandler} previousLabel={"<Prev"} nextLabel={"Next>"} breakLabel={"..."} pageCount={Math.ceil(count/productsPerPage)} />
      </div>}
      
  </div>
  </> }
  <ToastContainer containerId={"products"}/>
  </>;
};

export default Products;
