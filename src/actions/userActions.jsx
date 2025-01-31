import { REMOVE_USER, SET_USER } from "../reducers/userReducer";
import {
  ADD_PRODUCT_CART,
  DECREASE_PRODUCT_QUANTITY,
  INCREASE_PRODUCT_QUANTITY,
  REMOVE_ALL_PRODUCT,
} from "../reducers/cartReducer";
import { REMOVE_PRODUCT_CART } from "../reducers/cartReducer";

export const setUser = (userData) => ({
  type: SET_USER,
  payload: userData,
});

export const logOut = () => ({
  type: REMOVE_USER,
});

export const addProductToCart = (product) => ({
  type: ADD_PRODUCT_CART,
  payload: product,
});

export const increaseProductQuantity = (id) => ({
  type: INCREASE_PRODUCT_QUANTITY,
  payload: id,
});

export const decreaseProductQuantity = (id) => ({
  type: DECREASE_PRODUCT_QUANTITY,
  payload: id,
});

export const removeProductFromCart = (id) => ({
  type: REMOVE_PRODUCT_CART,
  payload: id,
});

export const removeAllProductFromCart = () => ({
  type: REMOVE_ALL_PRODUCT,
});
