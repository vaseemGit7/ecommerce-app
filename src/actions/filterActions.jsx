import { SET_SEARCH_QUERY } from "../reducers/paramsReducer";

export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});
