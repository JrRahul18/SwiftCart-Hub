import axios from "axios";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_CLEAR_ERRORS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_CLEAR_ERRORS,
  ADMIN_ALL_PRODUCT_REQUEST,
  ADMIN_ALL_PRODUCT_SUCCESS,
  ADMIN_ALL_PRODUCT_FAIL,
  ADMIN_ALL_PRODUCT_CLEAR_ERRORS,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_CLEAR_ERRORS,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_CLEAR_ERRORS,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_CLEAR_ERRORS,
  ADMIN_ALL_REVIEWS_REQUEST,
  ADMIN_ALL_REVIEWS_SUCCESS,
  ADMIN_ALL_REVIEWS_FAIL,
  ADMIN_ALL_REVIEWS_CLEAR_ERRORS,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_CLEAR_ERRORS
} from "../reducers/productReducer";

export const getProduct = (getKeyword, currentPage, price=[0, 25000], category, ratings=0) => async (dispatch) => {
  try {
    dispatch(ALL_PRODUCT_REQUEST());
    // console.log("Getkeyword: ", currentPage)
    let extractKeyword;
    if(getKeyword !== null && getKeyword.keyword !== null && getKeyword.keyword !== undefined ){
      extractKeyword=getKeyword.keyword;
    }
    else{
      extractKeyword = ''
    }
    let getLink = `http://localhost:4000/api/v1/products?keyword=${extractKeyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
    
    if(category){
      getLink = `http://localhost:4000/api/v1/products?keyword=${extractKeyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    }
    // console.log("getLink: ", getLink)
    const data = (await axios.get(getLink, {withCredentials: true}))
      .data;
    // console.log("Data(from action): ",data)

    dispatch(ALL_PRODUCT_SUCCESS(data));
  } catch (error) {
    // console.log("Error: ", error)
    dispatch(ALL_PRODUCT_FAIL(error.response.data.message));
  }
};

export const getAdminProducts = () =>async(dispatch)=>{
  try {
    dispatch(ADMIN_ALL_PRODUCT_REQUEST())
    const data = (await axios.get("http://localhost:4000/api/v1/admin/products", {withCredentials: true})).data

    dispatch(ADMIN_ALL_PRODUCT_SUCCESS(data))
    
  } catch (error) {
    dispatch(ADMIN_ALL_PRODUCT_FAIL(error.response.data.message))
  }

}
export const adminProductsClearErrors = () =>async(dispatch) =>{
  dispatch(ADMIN_ALL_PRODUCT_CLEAR_ERRORS())
}

export const getProductDetails = ({id}) => async (dispatch) => {
  // console.log("ID From action: ",id)
  try {
    dispatch(PRODUCT_DETAILS_REQUEST());
    const data = (
      await axios.get(`http://localhost:4000/api/v1/product/${id}`, {withCredentials: true})
    ).data;
    // console.log("Data(from action): ",data)

    dispatch(PRODUCT_DETAILS_SUCCESS(data));
  } catch (error) {
    dispatch(PRODUCT_DETAILS_FAIL(error.response.data.message));
  }
};

export const clearErrors = () => async (dispatch) => {
  // console.log("Entered here! ")
  dispatch(CLEAR_ERRORS());
};

export const productDetailsClearError = () => async (dispatch) =>{
  dispatch(PRODUCT_CLEAR_ERRORS())
}



export const putNewReview = (reviewData) => async (dispatch) => {
  // console.log("ID From action: ",id)
  try {
    dispatch(NEW_REVIEW_REQUEST());


    const config = {headers: {"Content-Type": "application/json"}, withCredentials: true}

    const data = (
      await axios.put(`http://localhost:4000/api/v1/review`, reviewData, config)
    ).data;
    // console.log("PutNewReview(from action): ",data)

    dispatch(NEW_REVIEW_SUCCESS(data.success));
  } catch (error) {
    dispatch(NEW_REVIEW_FAIL(error.response.data.message));
  }
};

export const newReviewClearErrors = () => async (dispatch) => {
  // console.log("Entered here! ")
  dispatch(NEW_REVIEW_CLEAR_ERRORS());
};


export const postNewProduct = (productData) => async (dispatch) => {
  // console.log("ID From action: ",id)
  try {
    dispatch(NEW_PRODUCT_REQUEST());


    const config = {headers: {"Content-Type": "application/json"}, withCredentials: true}

    const data = (
      await axios.post(`http://localhost:4000/api/v1/admin/product/new`, productData, config)
    ).data;
    // console.log("PostNewProduct(from action): ",data)

    dispatch(NEW_PRODUCT_SUCCESS(data));
  } catch (error) {
    dispatch(NEW_PRODUCT_FAIL(error.response.data.message));
  }
};
export const newProductClearErrors = () => async (dispatch) => {
  // console.log("Entered here! ")
  dispatch(NEW_PRODUCT_CLEAR_ERRORS());
};


export const deleteProduct = (productId) => async (dispatch) => {
  // console.log("ID From action: ",id)
  try {
    dispatch(DELETE_PRODUCT_REQUEST());

    const config = {withCredentials: true}

    const data = (
      await axios.delete(`http://localhost:4000/api/v1/admin/product/${productId}`, config)
    ).data;
    // console.log("DeleteProduct(from action): ",data)

    dispatch(DELETE_PRODUCT_SUCCESS(data.success));
  } catch (error) {
    dispatch(DELETE_PRODUCT_FAIL(error.response.data.message));
  }
};
export const deleteProductClearErrors = () => async (dispatch) => {
  // console.log("Entered here! ")
  dispatch(DELETE_PRODUCT_CLEAR_ERRORS());
};


export const putUpdateProduct = (id, productData) => async (dispatch) => {
  // console.log("ID From action: ",id)
  try {
    dispatch(UPDATE_PRODUCT_REQUEST());

    const config = {headers: {"Content-Type": "application/json"}, withCredentials: true}

    const data = (
      await axios.put(`http://localhost:4000/api/v1/admin/product/${id}`, productData, config)
    ).data;
    // console.log("PutUpdateProduct(from action): ",data)

    dispatch(UPDATE_PRODUCT_SUCCESS(data.success));
  } catch (error) {
    dispatch(UPDATE_PRODUCT_FAIL(error.response.data.message));
  }
};
export const updateProductClearErrors = () => async (dispatch) => {
  // console.log("Entered here! ")
  dispatch(UPDATE_PRODUCT_CLEAR_ERRORS());
};



export const getAdminReviews = (productId) => async (dispatch) => {
  // console.log("ID From action: ",id)
  try {
    dispatch(ADMIN_ALL_REVIEWS_REQUEST());

    const config = { withCredentials: true}

    const data = (
      await axios.get(`http://localhost:4000/api/v1/reviews?productId=${productId}`, config)
    ).data;

    dispatch(ADMIN_ALL_REVIEWS_SUCCESS(data.allReviews));
  } catch (error) {
    dispatch(ADMIN_ALL_REVIEWS_FAIL(error.response.data.message));
  }
};

export const adminReviewsClearError = () => async (dispatch) => {
  // console.log("Entered here! ")
  dispatch(ADMIN_ALL_REVIEWS_CLEAR_ERRORS());
};



export const deleteReview = (reviewId, productId) => async (dispatch) => {
  // console.log("ID From action: ",id)
  try {
    dispatch(DELETE_REVIEW_REQUEST());

    const config = { withCredentials: true}

    const data = (
      await axios.delete(`http://localhost:4000/api/v1/reviews?productId=${productId}&id=${reviewId}`, config)
    ).data;
    // console.log("deleteReview Action data: ", data)
    dispatch(DELETE_REVIEW_SUCCESS(data.success));
  } catch (error) {
    dispatch(DELETE_REVIEW_FAIL(error.response.data.message));
  }
};

export const deleteReviewClearError = () => async (dispatch) => {
  // console.log("Entered here! ")
  dispatch(DELETE_REVIEW_CLEAR_ERRORS());
};