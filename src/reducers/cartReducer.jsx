export const ADD_PRODUCT_CART = "ADD_PRODUCT_CART";
export const REMOVE_PRODUCT_CART = "REMOVE_PRODUCT_CART";
export const INCREASE_PRODUCT_QUANTITY = "INCREASE_PRODUCT_QUANTITY";
export const DECREASE_PRODUCT_QUANTITY = "DECREASE_PRODUCT_QUANTITY";
export const REMOVE_ALL_PRODUCT = "REMOVE_ALL_PRODUCT";

const initialState = [];

const cartReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case ADD_PRODUCT_CART:
      return [...state, actions.payload];
    case INCREASE_PRODUCT_QUANTITY:
      return state.map((product) =>
        product.id === actions.payload
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
    case DECREASE_PRODUCT_QUANTITY:
      return state.map((product) =>
        product.id === actions.payload
          ? { ...product, quantity: Math.max(product.quantity - 1, 0) }
          : product
      );
    case REMOVE_PRODUCT_CART:
      return state.filter((product) => product.id !== actions.payload);
    case REMOVE_ALL_PRODUCT:
      return initialState;
    default:
      return state;
  }
};

export default cartReducer;
