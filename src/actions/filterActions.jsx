import { SET_PARAM, SET_SEARCH_QUERY } from "../reducers/paramsReducer";

export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});

export const setParam = (key, value) => ({
  type: SET_PARAM,
  payload: { key, value },
});
