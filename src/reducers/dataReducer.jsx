export const SET_RESULT_DATA = "SET_RESULT_DATA";

const initialState = {};

const dataReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case SET_RESULT_DATA:
      return actions.payload;
    default:
      return state;
  }
};

export default dataReducer;
