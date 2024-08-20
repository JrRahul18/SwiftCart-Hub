// import { configureStore, createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "@redux-devtools/extension";

// const reducer = combineReducers({});
// let iniitialState = {};

// const middleware = [thunk];
// const store = createStore(
//   reducer,
//   iniitialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;

// import {applyMiddleware,combineReducers, legacy_createStore as createStore} from "redux";
// import {composeWithDevTools} from '@redux-devtools/extension';
// import  {thunk} from "redux-thunk";
// import { productReducer } from "./reducers/productReducer";
// // import {productDetailsReducer, productsReducer} from "./reducers/productReducer.jsx";
// // import {userReducer} from "./reducers/userReducer.jsx";

// const reducer = combineReducers({products: productReducer})

// let initialState = {}
// const middleware = [thunk];
// const store = createStore( reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

// export default store

import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
// import  productReducer  from "./reducers/productReducer";
import { combineReducers } from "@reduxjs/toolkit";
import { rootCombineReducer } from "./reducers/productReducer";
import { userCombineReducer } from "./reducers/userReducer";
import { cartCombineReducer } from "./reducers/cartReducer";
import { orderCombineReducer } from "./reducers/orderReducer";

const finalReducer = combineReducers({
  productCombine: rootCombineReducer,
  userCombine: userCombineReducer,
  cartCombine: cartCombineReducer,
  orderCombine: orderCombineReducer
});
export const store = configureStore({
  reducer: finalReducer,
});
