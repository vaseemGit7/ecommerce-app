export const ADD_PRODUCT_CART = "ADD_PRODUCT_CART";
export const REMOVE_PRODUCT_CART = "REMOVE_PRODUCT_CART";

const initialState = [];

const cartReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case ADD_PRODUCT_CART:
      return [...state, actions.payload];
    case REMOVE_PRODUCT_CART:
      return state.filter((product) => product.id !== actions.payload);
    default:
      return state;
  }
};

export default cartReducer;
