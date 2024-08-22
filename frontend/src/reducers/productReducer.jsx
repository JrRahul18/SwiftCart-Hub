import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

const initialState = {
  products: [],
};

export const productsReducer = createSlice({
  name: "productData",
  initialState: initialState,
  reducers: {
    ALL_PRODUCT_REQUEST: (state, action) => {
      return { loading: true, products: [] };
    },

    ALL_PRODUCT_SUCCESS: (state, action) => {
      const extractProducts = action.payload.allProducts;
      const extractCount = action.payload.productCount;
      const extractFilteredCount = action.payload.filteredCount;
      const productPerPage = action.payload.perPage;
      // console.log("Payload(AllProducts): ", extractProducts);
      return {
        loading: false,
        products: extractProducts,
        productCount: extractCount,
        productsPerPage: productPerPage,
        filteredCount: extractFilteredCount,
      };
    },

    ALL_PRODUCT_FAIL: (state, action) => {
      return { loading: false, error: action.payload };
    },

    CLEAR_ERRORS: (state, action) => {
      // console.log("Entered here! ")
      return { ...state, error: null };
    },

    ADMIN_ALL_PRODUCT_REQUEST: (state, action) => {
      return { loading: true, products: [] };
    },

    ADMIN_ALL_PRODUCT_SUCCESS: (state, action) => {
      const extractProducts = action.payload.adminAllProducts;
      return { loading: false, products: extractProducts };
    },

    ADMIN_ALL_PRODUCT_FAIL: (state, action) => {
      return { loading: false, error: action.payload };
    },

    ADMIN_ALL_PRODUCT_CLEAR_ERRORS: (state, action) => {
      // console.log("Entered here! ")
      return { ...state, error: null };
    },
  },
});

const initialState2 = {
  product: [],
};
export const productDetailsReducer = createSlice({
  name: "productData",
  initialState: { product: [] },
  reducers: {
    PRODUCT_DETAILS_REQUEST: (state, action) => {
      return { ...state, loading: true };
    },

    PRODUCT_DETAILS_SUCCESS: (state, action) => {
      const extractProduct = action.payload.product;
      // console.log("Payload(ProductDetails): ", extractProduct);
      return { loading: false, product: extractProduct };
    },

    PRODUCT_DETAILS_FAIL: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },

    PRODUCT_CLEAR_ERRORS: (state, action) => {
      return { ...state, error: null };
    },
  },
});

export const newReviewReducer = createSlice({
  name: "reviewData",
  initialState: {},
  reducers: {
    NEW_REVIEW_REQUEST: (state, action) => {
      return { ...state, loading: true };
    },

    NEW_REVIEW_SUCCESS: (state, action) => {
      return { loading: false, success: action.payload };
    },

    NEW_REVIEW_FAIL: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },
    NEW_REVIEW_RESET: (state, action) => {
      return { ...state, success: false, loading: false };
    },
    NEW_REVIEW_CLEAR_ERRORS: (state, action) => {
      return { ...state, error: null };
    },
  },
});

export const newProductReducer = createSlice({
  name: "newProductData",
  initialState: { product: [] },
  reducers: {
    NEW_PRODUCT_REQUEST: (state, action) => {
      return { ...state, loading: true };
    },

    NEW_PRODUCT_SUCCESS: (state, action) => {
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };
    },

    NEW_PRODUCT_FAIL: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },
    NEW_PRODUCT_RESET: (state, action) => {
      return { ...state, success: false, loading: false };
    },
    NEW_PRODUCT_CLEAR_ERRORS: (state, action) => {
      return { ...state, error: null };
    },
  },
});

export const productReducer = createSlice({
  name: "productData",
  initialState: {},
  reducers: {
    DELETE_PRODUCT_REQUEST: (state, action) => {
      return { ...state, loading: true };
    },

    DELETE_PRODUCT_SUCCESS: (state, action) => {
      return { ...state, loading: false, isDeleted: action.payload };
    },

    DELETE_PRODUCT_FAIL: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },
    DELETE_PRODUCT_RESET: (state, action) => {
      return { ...state, isDeleted: false };
    },
    DELETE_PRODUCT_CLEAR_ERRORS: (state, action) => {
      return { ...state, error: null };
    },

    UPDATE_PRODUCT_REQUEST: (state, action) => {
      return { ...state, loading: true };
    },

    UPDATE_PRODUCT_SUCCESS: (state, action) => {
      return { ...state, loading: false, isUpdated: action.payload };
    },

    UPDATE_PRODUCT_FAIL: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },
    UPDATE_PRODUCT_RESET: (state, action) => {
      return { ...state, isUpdated: false };
    },
    UPDATE_PRODUCT_CLEAR_ERRORS: (state, action) => {
      return { ...state, error: null };
    },
  },
});

export const productReviewsReducer = createSlice({
  name: "productReviewsData",
  initialState: { reviews: [] },
  reducers: {
    ADMIN_ALL_REVIEWS_REQUEST: (state, action) => {
      return { ...state, loading: true };
    },

    ADMIN_ALL_REVIEWS_SUCCESS: (state, action) => {
      // console.log("ADMIN ALL REVIEWS SUCCESS: ", action.payload);
      return { loading: false, reviews: action.payload };
    },

    ADMIN_ALL_REVIEWS_FAIL: (state, action) => {
      // console.log("ADMIN ALL REVIEWS FAIL: ", action.payload);
      return { ...state, loading: false, error: action.payload };
    },

    ADMIN_ALL_REVIEWS_CLEAR_ERRORS: (state, action) => {
      return { ...state, error: null };
    },
  },
});

export const reviewReducer = createSlice({
  name: "reviewData",
  initialState: {},
  reducers: {
    DELETE_REVIEW_REQUEST: (state, action) => {
      return { ...state, loading: true };
    },

    DELETE_REVIEW_SUCCESS: (state, action) => {
      // console.log("DELETE REVIEW SUCCESS: ", action.payload);
      return { loading: false, isDeleted: action.payload };
    },

    DELETE_REVIEW_FAIL: (state, action) => {
      // console.log("DELETE REVIEW FAIL: ", action.payload);
      return { ...state, loading: false, error: action.payload };
    },
    DELETE_REVIEW_RESET: (state, action) => {
      return { ...state, isDeleted: false, loading: false };
    },
    DELETE_REVIEW_CLEAR_ERRORS: (state, action) => {
      return { ...state, error: null };
    },
  },
});

export const rootCombineReducer = combineReducers({
  productsReducer: productsReducer.reducer,
  productReducer: productReducer.reducer,
  productDetailsReducer: productDetailsReducer.reducer,
  newReviewReducer: newReviewReducer.reducer,
  newProductReducer: newProductReducer.reducer,
  productReviewsReducer: productReviewsReducer.reducer,
  reviewReducer: reviewReducer.reducer,
});

export const {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  CLEAR_ERRORS,
  ADMIN_ALL_PRODUCT_REQUEST,
  ADMIN_ALL_PRODUCT_SUCCESS,
  ADMIN_ALL_PRODUCT_FAIL,
  ADMIN_ALL_PRODUCT_CLEAR_ERRORS,
} = productsReducer.actions;

export const {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_CLEAR_ERRORS,
} = productDetailsReducer.actions;

export const {
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  NEW_REVIEW_CLEAR_ERRORS,
} = newReviewReducer.actions;

export const {
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
  NEW_PRODUCT_CLEAR_ERRORS,
} = newProductReducer.actions;

export const {
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_CLEAR_ERRORS,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_CLEAR_ERRORS,
} = productReducer.actions;

export const {
  ADMIN_ALL_REVIEWS_REQUEST,
  ADMIN_ALL_REVIEWS_SUCCESS,
  ADMIN_ALL_REVIEWS_FAIL,
  ADMIN_ALL_REVIEWS_CLEAR_ERRORS,
} = productReviewsReducer.actions;

export const {
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_CLEAR_ERRORS,
} = reviewReducer.actions;
