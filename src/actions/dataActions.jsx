import { SET_RESULT_DATA } from "../reducers/dataReducer";

export const setResultData = (data) => ({
  type: SET_RESULT_DATA,
  payload: data,
});
