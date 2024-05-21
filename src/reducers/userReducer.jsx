export const SET_USER = "SET_USER";

const intialState = {
  id: "",
};

const userReducer = (state = intialState, actions) => {
  switch (actions.type) {
    case SET_USER:
      return { ...state, id: actions.payload };
    default:
      return state;
  }
};

export default userReducer;
