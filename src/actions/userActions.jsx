import { SET_USER } from "../reducers/userReducer";
import { ADD_PRODUCT_CART } from "../reducers/cartReducer";

export const setUser = (userId) => ({
  type: SET_USER,
  payload: userId,
});

export const addProductToCart = (product) => ({
  type: ADD_PRODUCT_CART,
  payload: product,
});
