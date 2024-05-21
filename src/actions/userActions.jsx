import { SET_USER } from "../reducers/userReducer";

export const setUser = (userId) => ({
  type: SET_USER,
  payload: userId,
});
