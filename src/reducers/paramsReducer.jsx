export const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";

const initialState = {
  searchQuery: "",
};

const paramsReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case SET_SEARCH_QUERY:
      return { ...state, searchQuery: actions.payload };
  }
};

export default paramsReducer;
