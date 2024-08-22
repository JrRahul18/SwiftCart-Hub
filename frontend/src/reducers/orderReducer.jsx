import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

export const newOrderReducer = createSlice({
  name: "orderData",
  initialState: {},
  reducers: {
    CREATE_ORDER_REQUEST: (state, action) => {
      return { ...state, loading: true };
    },
    CREATE_ORDER_SUCCESS: (state, action) => {
      // console.log("action payload: ", action.payload);
      return { loading: false, order: action.payload };
    },
    CREATE_ORDER_FAIL: (state, action) => {
      return { loading: false, error: action.payload };
    },
    CREATE_ORDER_CLEAR_ERRORS: (state, action) => {
      return { ...state, error: null };
    },
  },
});

export const myOrdersReducer = createSlice({
  name: "myOrders",
  initialState: { orders: [] },
  reducers: {
    MY_ORDERS_REQUEST: (state, action) => {
      return { loading: true };
    },
    MY_ORDERS_SUCCESS: (state, action) => {
      // console.log("myOrdersaction payload: ", action.payload);
      return { loading: false, orders: action.payload };
    },
    MY_ORDERS_FAIL: (state, action) => {
      return { loading: false, error: action.payload };
    },
    MY_ORDERS_CLEAR_ERRORS: (state, action) => {
      return { ...state, error: null };
    },
  },
});

export const orderDetailsReducer = createSlice({
  name: "orderDetails",
  initialState: { order: {} },
  reducers: {
    ORDER_DETAILS_REQUEST: (state, action) => {
      return { loading: true };
    },
    ORDER_DETAILS_SUCCESS: (state, action) => {
      // console.log("OrderDetailsaction payload: ", action.payload);
      return { loading: false, order: action.payload };
    },
    ORDER_DETAILS_FAIL: (state, action) => {
      return { loading: false, error: action.payload };
    },
    ORDER_DETAILS_CLEAR_ERRORS: (state, action) => {
      return { ...state, error: null };
    },
  },
});

export const allOrdersReducer = createSlice({
  name: "adminAllOrders",
  initialState: { orders: [], totalAmount: 0 },
  reducers: {
    ADMIN_ALL_ORDERS_REQUEST: (state, action) => {
      return { loading: true };
    },
    ADMIN_ALL_ORDERS_SUCCESS: (state, action) => {
      // console.log("adminAllOrdersAction payload: ", action.payload);
      return { loading: false, orders: action.payload.allOrders, totalAmount: action.payload.totalAmount };
    },
    ADMIN_ALL_ORDERS_FAIL: (state, action) => {
      return { loading: false, error: action.payload };
    },
    ADMIN_ALL_ORDERS_CLEAR_ERRORS: (state, action) => {
      return { ...state, error: null };
    },
  },
});

export const orderReducer = createSlice({
  name: "adminAllOrders",
  initialState: {},
  reducers: {
    UPDATE_ORDER_REQUEST: (state, action) => {
      return { ...state, loading: true };
    },
    UPDATE_ORDER_SUCCESS: (state, action) => {
      // console.log("updateOrderAction payload: ", action.payload);
      return { ...state, loading: false, isUpdated: action.payload };
    },
    UPDATE_ORDER_FAIL: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },
    UPDATE_ORDER_RESET: (state, action) => {
      return { ...state, isUpdated: false };
    },
    UPDATE_ORDER_CLEAR_ERRORS: (state, action) => {
      return { ...state, error: null };
    },

    DELETE_ORDER_REQUEST: (state, action) => {
      return { ...state, loading: true };
    },
    DELETE_ORDER_SUCCESS: (state, action) => {
      // console.log("updateOrderAction payload: ", action.payload);
      return { ...state, loading: false, isDeleted: action.payload };
    },
    DELETE_ORDER_FAIL: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },
    DELETE_ORDER_RESET: (state, action) => {
      return { ...state, isDeleted: false };
    },
    DELETE_ORDER_CLEAR_ERRORS: (state, action) => {
      return { ...state, error: null };
    },
  },
});

export const orderCombineReducer = combineReducers({
  newOrderReducer: newOrderReducer.reducer,
  myOrdersReducer: myOrdersReducer.reducer,
  orderDetailsReducer: orderDetailsReducer.reducer,
  allOrdersReducer: allOrdersReducer.reducer,
  orderReducer: orderReducer.reducer,
});

export const {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_CLEAR_ERRORS,
} = newOrderReducer.actions;

export const {
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  MY_ORDERS_CLEAR_ERRORS,
} = myOrdersReducer.actions;

export const {
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_CLEAR_ERRORS,
} = orderDetailsReducer.actions;

export const {
  ADMIN_ALL_ORDERS_REQUEST,
  ADMIN_ALL_ORDERS_SUCCESS,
  ADMIN_ALL_ORDERS_FAIL,
  ADMIN_ALL_ORDERS_CLEAR_ERRORS,
} = allOrdersReducer.actions;

export const {
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_RESET,
  UPDATE_ORDER_CLEAR_ERRORS,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_RESET,
  DELETE_ORDER_CLEAR_ERRORS,
} = orderReducer.actions;
