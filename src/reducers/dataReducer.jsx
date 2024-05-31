export const SET_RESULT_DATA = "SET_RESULT_DATA";

const initialState = {
  resultData: {},
};

const dataReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case SET_RESULT_DATA:
      return { ...state, resultData: actions.payload };
    default:
      return state;
  }
};

export default dataReducer;
