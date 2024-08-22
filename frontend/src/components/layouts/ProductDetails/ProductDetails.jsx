import React, { useEffect, useState } from 'react'
import styles from "./ProductDetails.module.css"
import Carousel from 'react-material-ui-carousel'
import {useSelector, useDispatch} from 'react-redux'
import { getProductDetails, newReviewClearErrors, productDetailsClearError, putNewReview } from '../../../actions/productAction'
// import { productClearErrors } from '../../actions/productAction'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import MetaData from '../MetaData/MetaData'
import ReviewCard from '../ReviewCard/ReviewCard'
import Loading from '../LoadingPage/Loading'
import {ToastContainer, toast, Bounce} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { addItemsToCart } from '../../../actions/cartAction'
import { Dialog, DialogActions, DialogTitle, Button, DialogContent, Rating } from '@mui/material'
import "./ProductDetails.css"
import { NEW_REVIEW_RESET } from '../../../reducers/productReducer'

const ProductDetails = ({match}) => {
  const [quantity, setQuantity]=useState(1);
  const [openDialogBox, setOpenDialogBox]=useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment]=useState("")

  const prodId = useParams();

  const dispatch = useDispatch();
  const getProd = useSelector(store => store.productCombine.productDetailsReducer.product)
  const getLoading = useSelector(store => store.productCombine.productDetailsReducer.loading);
  const getError = useSelector(store => store.productCombine.productDetailsReducer.error);

  const {success, loading, error} = useSelector(store => store.productCombine.newReviewReducer);
  // console.log("Error: ", getError)


  useEffect(()=>{
    if(getError){
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
      // dispatch(productClearErrors())
      dispatch(productDetailsClearError())
    }
    if(error){
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
      dispatch(newReviewClearErrors())
    }

    if(success){
      // console.log("success true")
      toast.success("Review added Succesfully", {
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
      // dispatch(productClearErrors())
      dispatch(NEW_REVIEW_RESET());
    }


    dispatch(getProductDetails(prodId))

  }, [dispatch, prodId, getError, error, toast, success])
  const carouselOptions = {animation: 'slide'}

  const decreaseQuantity = ()=>{
    if(quantity <=1) return;
    setQuantity(prev => prev-1)
  }
  const increaseQuantity = ()=>{
    if(getProd.stock <= quantity) return;
    setQuantity(prev => prev+1)
  }

  const addToCartHandler = (event) =>{
    event.preventDefault();
    dispatch(addItemsToCart(prodId.id, quantity))
    toast.success("Added to Cart", {
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

  const submitReviewHandler = () =>{
    // console.log("enteredsubmit")
    if(reviewComment.trim().length === 0){
      // console.log("Enter Something")
      toast.error("Enter Valid Review", {
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
      return;
    }


    const myForm = new FormData()
    myForm.set("comment", reviewComment)
    myForm.set("rating", reviewRating)
    myForm.set("productId", prodId.id)
    dispatch(putNewReview(myForm));
    setOpenDialogBox(false)

  }
  const submitBoxToggleHandler = () =>{
    openDialogBox === true ? setOpenDialogBox(false) : setOpenDialogBox(true)
  }

  const options = {
    size: 'large',
    precision: 0.5,
    readOnly: true,
    value: getProd.ratings,
  };
  return (
    <>
    {getLoading===true ? <Loading/> : <><MetaData title={`${getProd.name} | SwiftCart Hub`}></MetaData>
    <div className={styles.outerContainer}>
      <div className={styles.productData}>
        
        <div className={styles.productImage}>
          <Carousel className={styles.carousel}{...carouselOptions}>
            {getProd.image && getProd.image.map((image, index)=>(
              <img key={index} className={styles.carouselImage} src={image.url} alt={`Image ${index} `} />
            ))}
          </Carousel>
        </div>
        <div className={styles.productInfo}>
          <div className={styles.box1}>
            <h2 className={styles.productName}>{getProd.name}</h2>
            <p className={styles.productId}>Product Id: <h4>{getProd._id}</h4></p>
            <div className={styles.descriptionBox}>
            <p>{getProd.description}</p>
            </div>
            <div className={styles.priceBox}>
              <h1 className={styles.price}>₹ {getProd.price}</h1>
            </div>
          </div>
          <div className={styles.box2}>
              <p>Ratings: </p>
          <Rating  {...options} className={styles.reactStars} />
          <div className={styles.reviewCountBox}>
            <p className={styles.numberOfReviews}>&nbsp; {`(${getProd.numberOfReviews} reviews)`}</p>
          </div>
          </div>
          <div className={`${styles.box4} ${getProd.stock > 0 ? styles.inStock : styles.outOfStock}`}>
              <p>Status: <b>{getProd.stock >0 ? "In Stock" : "Out Of Stock"}</b></p>
            </div>
          <div className={styles.box3}>
            <div className={styles.quantityBox}>
              <button className={styles.lessButton} onClick={decreaseQuantity}>-</button>
              <input className={styles.countInput} readOnly type="number"  value={quantity}/>
              <button className={styles.moreButton} onClick={increaseQuantity}>+</button>
            </div>
            <div className={styles.addToCartBox}>
              <button disabled = {getProd.stock < 1 ? true : false} className={styles.addButton} onClick={addToCartHandler}>{getProd.stock < 1 ? "Not Available" : "Add To Cart"}</button>
            </div> 
          </div>
          
        </div>
      </div>
      <Dialog onClose={submitBoxToggleHandler} aria-labelledby='simple-dialog-title' open={openDialogBox}>
        <DialogTitle> Add Your Review </DialogTitle>
        <DialogContent> 
          <Rating value={reviewRating} size='large' onChange={(event)=> setReviewRating(event.target.value) }/>

            <textarea className={`cssAddReviewText ${styles.addReviewText} `} value={reviewComment} onChange={(event)=> setReviewComment(event.target.value)} name="comment" rows='5' cols='50' id=""></textarea>

            <DialogActions>
              <Button className= {`cancelButton ${styles.cancelButton} `}  onClick={submitBoxToggleHandler}>Cancel</Button>
              <Button onClick={submitReviewHandler} className= {`confirmButton ${styles.confirmButton} `}  >Add</Button>
            </DialogActions>
        </DialogContent>
      </Dialog>
      <div className={styles.reviewsContainer}>
        <div className={styles.headingBox}>
        <h3 className={styles.reviewHeading}>Reviews</h3>

        <button onClick={submitBoxToggleHandler} className={styles.addReviewButton}> Add Review</button>
        </div>
          {getProd.reviews && getProd.reviews[0] ? (

            <div className={styles.reviewsBox}>
              {getProd.reviews && getProd.reviews.map((review, index)=>(
                <div key={index}><ReviewCard review={review}/></div>
              ))}
            </div>
            
          ): (<div className={styles.noReviewBox}>
            <p className={styles.noReview}>No reviews :/</p>
          </div>)}

      </div>
    </div>
    </>}
    <ToastContainer containerId={"product_details"}/>
    </>
  )
}

export default ProductDetails