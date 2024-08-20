import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_CLEAR_ERRORS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_CLEAR_ERRORS,
  LOAD_REQUEST,
  LOAD_SUCCESS,
  LOAD_FAIL,
  LOAD_CLEAR_ERRORS,
  LOGOUT_CLEAR_ERRORS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_CLEAR_ERRORS,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_CLEAR_ERRORS,
  FORGOT_PASSWORD_CLEAR_ERRORS,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_CLEAR_ERRORS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ADMIN_ALL_USERS_REQUEST,
  ADMIN_ALL_USERS_SUCCESS,
  ADMIN_ALL_USERS_FAIL,
  ADMIN_ALL_USERS_CLEAR_ERRORS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_CLEAR_ERRORS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_CLEAR_ERRORS,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_CLEAR_ERRORS,

} from "../reducers/userReducer";



export const getLogin = (email, password) => async (dispatch) => {
  try {
    dispatch(LOGIN_REQUEST());
    // console.log("email, password from action", email, password)
    const config = {headers: {"Content-Type": "application/json"}, withCredentials: true}

    const data = (await axios.post("http://localhost:4000/api/v1/login", {
      email,
      password,
    }, config)).data;
    console.log("LOGIN DATA from action: ", data)

    dispatch(LOGIN_SUCCESS(data.user))
  } catch (error) {
    console.log("error action: ", error)
    dispatch(LOGIN_FAIL(error.response.data.message));
  }
};
export const loginClearErrors = () => async(dispatch) =>{
  dispatch(LOGIN_CLEAR_ERRORS());
}


export const getRegister = (userData) => async (dispatch) =>{
  try {
    dispatch(REGISTER_REQUEST());
    console.log("UserDATA (from action): ", userData)
    const config = {headers: {"Content-Type": "multipart/form-data"}, withCredentials: true}

    const data = (await axios.post("http://localhost:4000/api/v1/register", userData, config)).data;
    console.log("REGISTER DATA from action: ", data)

    dispatch(REGISTER_SUCCESS(data.user))
  } catch (error) {
    console.log("error action: ", error)
    dispatch(REGISTER_FAIL(error.response.data.message));
  }
}

export const registerClearErrors = () => async(dispatch) =>{
  dispatch(REGISTER_CLEAR_ERRORS())
}


export const getLoadUser = () => async (dispatch) => {
  try {
    dispatch(LOAD_REQUEST());
    // console.log("email, password from action", email, password)

    const data = (await axios.get("http://localhost:4000/api/v1/my-account", {withCredentials: true})).data;
    // console.log("LOAD DATA from action: ", data)

    dispatch(LOAD_SUCCESS(data.user))
  } catch (error) {
    // console.log("error action: ", error)
    dispatch(LOAD_FAIL(error.response.data.message));
  }
};
export const loadingClearErrors = () => async(dispatch) =>{
  dispatch(LOAD_CLEAR_ERRORS());
}

export const getLogout = () => async (dispatch) => {
  try {
    (await axios.get("http://localhost:4000/api/v1/logout", {withCredentials: true})).data;
    // console.log("Logout Data from action: ", data)

    dispatch(LOGOUT_SUCCESS())
  } catch (error) {
    console.log("error action: ", error)
    dispatch(LOGOUT_FAIL(error.response.data.message));
  }
}
export const logoutClearErrors = ()=> async(dispatch) => {
dispatch(LOGOUT_CLEAR_ERRORS())
}

export const putUpdateProfile = (userData) => async (dispatch) =>{
  try {
    dispatch(UPDATE_REQUEST());
    console.log("UpdateDATA input (from action): ", userData)
    const config = {headers: {"Content-Type": "multipart/form-data"}, withCredentials: true}

    const data = (await axios.put("http://localhost:4000/api/v1/my-account/update-profile", userData, config)).data;
    console.log("UpdateDATA from action: ", data)

    dispatch(UPDATE_SUCCESS(data.success))
  } catch (error) {
    console.log("updateError action: ", error)
    dispatch(UPDATE_FAIL(error.response.data.message));
  }
}

export const updateProfileClearErrors = () => async(dispatch)=>{
  dispatch(UPDATE_CLEAR_ERRORS())
}

export const putUpdatePassword = (password) => async (dispatch) =>{
  try {
    dispatch(UPDATE_PASSWORD_REQUEST());
    console.log("UpdatePassword input (from action): ", password)
    const config = {headers: {"Content-Type": "application/json"}, withCredentials: true}

    const data = (await axios.put("http://localhost:4000/api/v1//password/change-password", password, config)).data;
    console.log("UpdatePassword from action: ", data)

    dispatch(UPDATE_PASSWORD_SUCCESS(data.success))
  } catch (error) {
    console.log("updateError action: ", error)
    dispatch(UPDATE_PASSWORD_FAIL(error.response.data.message));
  }
}

export const updatePasswordClearErrors = () => async(dispatch)=>{
  dispatch(UPDATE_PASSWORD_CLEAR_ERRORS())
}


export const postForgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(FORGOT_PASSWORD_REQUEST());
    // console.log("email, password from action", email, password)
    const config = {headers: {"Content-Type": "application/json"}, withCredentials: true}

    const data = (await axios.post("http://localhost:4000/api/v1/password/forget-password", email, config)).data;
    console.log("Forgot Password DATA from action: ", data)

    dispatch(FORGOT_PASSWORD_SUCCESS(data.message))
  } catch (error) {
    console.log("error action: ", error)
    dispatch(FORGOT_PASSWORD_FAIL(error.response.data.message));
  }
};
export const forgotPasswordClearErrors = () => async(dispatch) =>{
  dispatch(FORGOT_PASSWORD_CLEAR_ERRORS());
}



export const putResetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch(RESET_PASSWORD_REQUEST());
    // console.log("email, password from action", email, password)
    const config = {headers: {"Content-Type": "application/json"}, withCredentials: true}

    const data = (await axios.put(`http://localhost:4000/api/v1/password/reset/${token}`, password, config)).data;
    console.log("Reset Password DATA from action: ", data)

    dispatch(RESET_PASSWORD_SUCCESS(data.success))
  } catch (error) {
    console.log("error action: ", error)
    dispatch(RESET_PASSWORD_FAIL(error.response.data.message));
  }
};
export const resetPasswordClearErrors = () => async(dispatch) =>{
  dispatch(RESET_PASSWORD_CLEAR_ERRORS());
}

export const getAdminUsers = () => async (dispatch) => {
  try {
    dispatch(ADMIN_ALL_USERS_REQUEST());

    const data = (await axios.get("http://localhost:4000/api/v1/admin/all-users", {withCredentials: true})).data;

    dispatch(ADMIN_ALL_USERS_SUCCESS(data.allUsers))

  } catch (error) {

    dispatch(ADMIN_ALL_USERS_FAIL(error.response.data.message));
  }
};
export const adminUsersClearError = () => async(dispatch) =>{
  dispatch(ADMIN_ALL_USERS_CLEAR_ERRORS());
}



export const getUserDetails = (userId) => async (dispatch) => {
  try {
    dispatch(USER_DETAILS_REQUEST());

    const data = (await axios.get(`http://localhost:4000/api/v1/admin/user/${userId}`, {withCredentials: true})).data;

    dispatch(USER_DETAILS_SUCCESS(data.user))

  } catch (error) {

    dispatch(USER_DETAILS_FAIL(error.response.data.message));
  }
};
export const userDetailsClearError = () => async(dispatch) =>{
  dispatch(USER_DETAILS_CLEAR_ERRORS());
}



export const putUpdateUser = (userId, userData) => async (dispatch) =>{
  try {
    dispatch(UPDATE_USER_REQUEST());

    const config = {headers: {"Content-Type": "application/json"}, withCredentials: true}

    const data = (await axios.put(`http://localhost:4000/api/v1/admin/user/${userId}`, userData, config)).data;

    dispatch(UPDATE_USER_SUCCESS(data.success))

  } catch (error) {
    dispatch(UPDATE_USER_FAIL(error.response.data.message));
  }
}

export const updateUserClearErrors = () => async(dispatch)=>{
  dispatch(UPDATE_USER_CLEAR_ERRORS())
}


export const deleteUser = (userId) => async (dispatch) =>{
  try {
    dispatch(DELETE_USER_REQUEST());

    const config = { withCredentials: true}

    const data = (await axios.delete(`http://localhost:4000/api/v1/admin/user/${userId}`, config)).data;

    dispatch(DELETE_USER_SUCCESS(data))

  } catch (error) {
    dispatch(DELETE_USER_FAIL(error.response.data.message));
  }
}

export const deleteUserClearErrors = () => async(dispatch)=>{
  dispatch(DELETE_USER_CLEAR_ERRORS())
}