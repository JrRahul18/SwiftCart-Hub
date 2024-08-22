import axios from "axios";
import {
  ADMIN_ALL_ORDERS_CLEAR_ERRORS,
  ADMIN_ALL_ORDERS_FAIL,
  ADMIN_ALL_ORDERS_REQUEST,
  ADMIN_ALL_ORDERS_SUCCESS,
  CREATE_ORDER_CLEAR_ERRORS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  DELETE_ORDER_CLEAR_ERRORS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  MY_ORDERS_CLEAR_ERRORS,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  ORDER_DETAILS_CLEAR_ERRORS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  UPDATE_ORDER_CLEAR_ERRORS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
} from "../reducers/orderReducer";



export const createOrder = (orderData) => async (dispatch) => {
  try {
    dispatch(CREATE_ORDER_REQUEST())

    const config = {headers: {"Content-Type": "application/json"}, withCredentials: true}

    const data =  (await axios.post("http://localhost:4000/api/v1/order/new", orderData, config)).data

    // console.log("DATA from action: ", data)

    dispatch(CREATE_ORDER_SUCCESS(data));

  } catch (error) {
    dispatch(CREATE_ORDER_FAIL(error.response.data.message));
  }
};

export const createOrderClearErrors = () => async (dispatch) => {
  dispatch(CREATE_ORDER_CLEAR_ERRORS());
};




export const getMyOrders = () => async (dispatch) => {
  try {
    dispatch(MY_ORDERS_REQUEST())

    const config = {withCredentials: true}

    const data =  (await axios.get("http://localhost:4000/api/v1/orders/me",  config)).data

    // console.log("getMyOrdersData from action: ", data)

    dispatch(MY_ORDERS_SUCCESS(data.myOrders));

  } catch (error) {
    dispatch(MY_ORDERS_FAIL(error.response.data.message));
  }
};

export const myOrdersClearErrors = () => async (dispatch) => {
  dispatch(MY_ORDERS_CLEAR_ERRORS());
};



export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch(ORDER_DETAILS_REQUEST())

    const config = {withCredentials: true}

    const data =  (await axios.get(`http://localhost:4000/api/v1/order/${id}`,  config)).data

    // console.log("getMyOrdersData from action: ", data)

    dispatch(ORDER_DETAILS_SUCCESS(data.order));

  } catch (error) {
    dispatch(ORDER_DETAILS_FAIL(error.response.data.message));
  }
};

export const orderDetailsClearErrors = () => async (dispatch) => {
  dispatch(ORDER_DETAILS_CLEAR_ERRORS());
};




export const getAdminOrders = () => async (dispatch) => {
  try {
    dispatch(ADMIN_ALL_ORDERS_REQUEST())

    const config = {withCredentials: true}

    const data =  (await axios.get("http://localhost:4000/api/v1/admin/orders",  config)).data

    // console.log("getAdminOrdersData from action: ", data)

    dispatch(ADMIN_ALL_ORDERS_SUCCESS(data));

  } catch (error) {
    dispatch(ADMIN_ALL_ORDERS_FAIL(error.response.data.message));
  }
};

export const adminOrdersClearErrors = () => async (dispatch) => {
  dispatch(ADMIN_ALL_ORDERS_CLEAR_ERRORS());
};


export const putUpdateOrder = (orderId, orderData) => async (dispatch) => {
  try {
    dispatch(UPDATE_ORDER_REQUEST())

    const config = {headers: {"Content-Type": "application/json"}, withCredentials: true}

    const data =  (await axios.put(`http://localhost:4000/api/v1/admin/order/${orderId}`, orderData, config)).data

    // console.log("DATA from action: ", data)

    dispatch(UPDATE_ORDER_SUCCESS(data.success));

  } catch (error) {
    dispatch(UPDATE_ORDER_FAIL(error.response.data.message));
  }
};

export const updateOrderClearErrors = () => async (dispatch) => {
  dispatch(UPDATE_ORDER_CLEAR_ERRORS());
};



export const deleteOrder = (orderId) => async (dispatch) => {
  try {
    dispatch(DELETE_ORDER_REQUEST())

    const config = { withCredentials: true}

    const data =  (await axios.delete(`http://localhost:4000/api/v1/admin/order/${orderId}`,  config)).data

    // console.log("DATA from action: ", data)

    dispatch(DELETE_ORDER_SUCCESS(data.success));

  } catch (error) {
    dispatch(DELETE_ORDER_FAIL(error.response.data.message));
  }
};

export const deleteOrderClearErrors = () => async (dispatch) => {
  dispatch(DELETE_ORDER_CLEAR_ERRORS());
};