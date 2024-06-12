export const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";
export const SET_PARAM = "SET_PARAM";

const initialState = {
  query: "",
  sortBy: "stock",
};

const paramsReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case SET_SEARCH_QUERY:
      return { ...state, query: actions.payload };
    case SET_PARAM:
      return { ...state, [actions.payload.key]: actions.payload.value };
    default:
      return state;
  }
};

export default paramsReducer;
