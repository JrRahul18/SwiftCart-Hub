import axios from "axios";
import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../reducers/cartReducer";

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  // console.log("email, password from action", email, password)
  const config = { withCredentials: true };

  const data = (
    await axios.get(`http://localhost:4000/api/v1/product/${id}`, config)
  ).data;
  // console.log("addItem DATA from action: ", data);

  dispatch(
    ADD_TO_CART({
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.image[0].url,
      stock: data.product.stock,
      quantity,
    })
  );

  localStorage.setItem("cartData", JSON.stringify(getState().cartCombine.cartReducer.cartData));
};

export const removeItemFromCart = (id) => async (dispatch, getState) =>{
  dispatch(REMOVE_CART_ITEM(id));
  localStorage.setItem("cartData", JSON.stringify(getState().cartCombine.cartReducer.cartData));
}

export const saveShippingInfo = (data) => async(dispatch) =>{
  dispatch(SAVE_SHIPPING_INFO(data))

  localStorage.setItem("shippingInfo", JSON.stringify(data))
}