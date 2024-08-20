import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

const checkCookie = (cookieName) => {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === cookieName) {
      return value;
    }
  }
  return null;
};

export const userReducer = createSlice({
  name: "userData",
  initialState: { user: {} },
  reducers: {
    LOGIN_REQUEST: (state, action) => {
      return { loading: true, isAuthenticated: false };
    },
    LOGIN_SUCCESS: (state, action) => {
      // console.log("action payload", action.payload);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    },
    LOGIN_FAIL: (state, action) => {
      console.log("LOGIN_FAIL: ", action.payload);
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    },
    LOGIN_CLEAR_ERRORS: (state, action) => {
      return { ...state, error: null };
    },

    REGISTER_REQUEST: (state, action) => {
      return { loading: true, isAuthenticated: false };
    },
    REGISTER_SUCCESS: (state, action) => {
      // console.log("action payload", action.payload);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    },
    REGISTER_FAIL: (state, action) => {
      console.log("LOGIN_FAIL: ", action.payload);
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    },
    REGISTER_CLEAR_ERRORS: (state, action) => {
      return { ...state, error: null };
    },
    LOAD_REQUEST: (state, action) => {
      return { loading: true, isAuthenticated: false };
    },
    LOAD_SUCCESS: (state, action) => {
      // console.log("action payload", action.payload);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    },
    LOAD_FAIL: (state, action) => {
      // console.log("LOAD_FAIL: ", action.payload);
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    },
    LOAD_CLEAR_ERRORS: (state, action) => {
      return { ...state, error: null };
    },
    LOGOUT_SUCCESS: (state, action) => {
      return { loading: false, user: null, isAuthenticated: false };
    },
    LOGOUT_FAIL: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },
    LOGOUT_CLEAR_ERRORS: (state, action) => {
      return { ...state, error: null };
    },
  },
});

export const userProfileReducer = createSlice({
  name: "userProfileData",
  initialState: { userProfileData: {} },
  reducers: {
    UPDATE_REQUEST: (state, action) => {
      return { ...state, loading: true };
    },
    UPDATE_SUCCESS: (state, action) => {
      console.log("UPDATE SUCCESS: ", action.payload);
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    },
    UPDATE_FAIL: (state, action) => {
      console.log("UPDATE FAIL: ", action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    UPDATE_RESET: (state, action) => {
      return {
        ...state,
        isUpdated: false,
      };
    },
    UPDATE_CLEAR_ERRORS: (state, action) => {
      return { ...state, error: null };
    },

    UPDATE_PASSWORD_REQUEST: (state, action) => {
      return { ...state, loading: true };
    },
    UPDATE_PASSWORD_SUCCESS: (state, action) => {
      console.log("UPDATE PASSWORD SUCCESS: ", action.payload);
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    },
    UPDATE_PASSWORD_FAIL: (state, action) => {
      console.log("UPDATE PASSWORD FAIL: ", action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    UPDATE_PASSWORD_RESET: (state, action) => {
      return {
        ...state,
        isUpdated: false,
      };
    },
    UPDATE_PASSWORD_CLEAR_ERRORS: (state, action) => {
      return { ...state, error: null };
    },

    UPDATE_USER_REQUEST: (state, action) => {
      return { ...state, loading: true };
    },
    UPDATE_USER_SUCCESS: (state, action) => {
      console.log("UPDATE USER SUCCESS: ", action.payload);
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    },
    UPDATE_USER_FAIL: (state, action) => {
      console.log("UPDATE USER FAIL: ", action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    UPDATE_USER_RESET: (state, action) => {
      return {
        ...state,
        isUpdated: false,
      };
    },
    UPDATE_USER_CLEAR_ERRORS: (state, action) => {
      return { ...state, error: null };
    },

    DELETE_USER_REQUEST: (state, action) => {
      return { ...state, loading: true };
    },
    DELETE_USER_SUCCESS: (state, action) => {
      console.log("DELETE USER SUCCESS: ", action.payload);
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message
      };
    },
    DELETE_USER_FAIL: (state, action) => {
      console.log("DELETE USER FAIL: ", action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    DELETE_USER_RESET: (state, action) => {
      return {
        ...state,
        isDeleted: false,
      };
    },
    DELETE_USER_CLEAR_ERRORS: (state, action) => {
      return { ...state, error: null };
    },
  },
});

export const forgotPasswordReducer = createSlice({
  name: "forgotPasswordData",
  initialState: { forgotPasswordData: {} },
  reducers: {
    FORGOT_PASSWORD_REQUEST: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    FORGOT_PASSWORD_SUCCESS: (state, action) => {
      console.log("UPDATE SUCCESS: ", action.payload);
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    },
    FORGOT_PASSWORD_FAIL: (state, action) => {
      console.log("UPDATE FAIL: ", action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    FORGOT_PASSWORD_CLEAR_ERRORS: (state, action) => {
      return { ...state, error: null };
    },
    RESET_PASSWORD_REQUEST: (state, action) => {
      return { ...state, loading: true, error: null };
    },
    RESET_PASSWORD_SUCCESS: (state, action) => {
      console.log("UPDATE SUCCESS: ", action.payload);
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    },
    RESET_PASSWORD_FAIL: (state, action) => {
      console.log("UPDATE FAIL: ", action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    RESET_PASSWORD_CLEAR_ERRORS: (state, action) => {
      return { ...state, error: null };
    },
  },
});

export const allUsersReducer = createSlice({
  name: "allUsersData",
  initialState: { users: [] },
  reducers: {
    ADMIN_ALL_USERS_REQUEST: (state, action) => {
      return { ...state, loading: true };
    },
    ADMIN_ALL_USERS_SUCCESS: (state, action) => {
      console.log("ALLUSERS SUCCESS: ", action.payload);
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    },
    ADMIN_ALL_USERS_FAIL: (state, action) => {
      console.log("ALLUSERS FAIL: ", action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    ADMIN_ALL_USERS_CLEAR_ERRORS: (state, action) => {
      return { ...state, error: null };
    },
  },
});

export const userDetailsReducer = createSlice({
  name: "userDetailsData",
  initialState: { user: {} },
  reducers: {
    USER_DETAILS_REQUEST: (state, action) => {
      return { ...state, loading: true };
    },
    USER_DETAILS_SUCCESS: (state, action) => {
      console.log("USER DETAILS SUCCESS: ", action.payload);
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    },
    USER_DETAILS_FAIL: (state, action) => {
      console.log("USER DETAILS FAIL: ", action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    USER_DETAILS_CLEAR_ERRORS: (state, action) => {
      return { ...state, error: null };
    },
  },
});

export const userCombineReducer = combineReducers({
  userReducer: userReducer.reducer,
  userProfileReducer: userProfileReducer.reducer,
  forgotPasswordReducer: forgotPasswordReducer.reducer,
  allUsersReducer: allUsersReducer.reducer,
  userDetailsReducer: userDetailsReducer.reducer,
});

export const {
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
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_CLEAR_ERRORS,
} = userReducer.actions;
export const {
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  UPDATE_CLEAR_ERRORS,
  UPDATE_RESET,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_CLEAR_ERRORS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  UPDATE_USER_CLEAR_ERRORS,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
  DELETE_USER_CLEAR_ERRORS,
} = userProfileReducer.actions;

export const {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_CLEAR_ERRORS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_CLEAR_ERRORS,
} = forgotPasswordReducer.actions;

export const {
  ADMIN_ALL_USERS_REQUEST,
  ADMIN_ALL_USERS_SUCCESS,
  ADMIN_ALL_USERS_FAIL,
  ADMIN_ALL_USERS_CLEAR_ERRORS,
} = allUsersReducer.actions;

export const {
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_CLEAR_ERRORS,
} = userDetailsReducer.actions;
