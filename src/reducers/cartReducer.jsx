export const ADD_PRODUCT_CART = "ADD_PRODUCT_CART";

const initialState = [];

const cartReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case ADD_PRODUCT_CART:
      return [...state, actions.payload];
    default:
      return state;
  }
};

export default cartReducer;
