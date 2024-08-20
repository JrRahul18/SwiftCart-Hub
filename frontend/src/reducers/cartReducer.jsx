import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

const initialState = {
  cartData: localStorage.getItem("cartData")
    ? JSON.parse(localStorage.getItem("cartData"))
    : [],
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
};

export const cartReducer = createSlice({
  name: "cartData",
  initialState: initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      const item = action.payload;
      // console.log("Payload in reducer: ", item);
      const isItem = state.cartData.find((i) => i.product === item.product);
      // console.log("isItem: ", isItem);
      if (isItem) {
        return {
          ...state,
          cartData: state.cartData.map((i) =>
            i.product === isItem.product ? item : i
          ),
        };
      } else {
        return { ...state, cartData: [...state.cartData, item] };
      }
    },
    REMOVE_CART_ITEM: (state, action) => {
      return {
        ...state,
        cartData: state.cartData.filter((i) => i.product !== action.payload),
      };
    },

    SAVE_SHIPPING_INFO: (state, action) => {
      return { ...state, shippingInfo: action.payload };
    },
  },
});

export const cartCombineReducer = combineReducers({
  cartReducer: cartReducer.reducer,
});

export const { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } =
  cartReducer.actions;
