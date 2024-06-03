export const SET_USER = "SET_USER";

const intialState = {};

const userReducer = (state = intialState, actions) => {
  switch (actions.type) {
    case SET_USER:
      return actions.payload;
    default:
      return state;
  }
};

export default userReducer;
