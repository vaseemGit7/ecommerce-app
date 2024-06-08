export const SET_USER = "SET_USER";
export const REMOVE_USER = "REMOVE_USER";

const intialState = {};

const userReducer = (state = intialState, actions) => {
  switch (actions.type) {
    case SET_USER:
      return actions.payload;
    case REMOVE_USER:
      return intialState;
    default:
      return state;
  }
};

export default userReducer;
