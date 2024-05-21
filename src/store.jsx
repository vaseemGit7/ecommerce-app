import { createStore } from "redux";
import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";

const combinedReducer = combineReducers({
  userReducer: userReducer,
});

const store = createStore(combinedReducer);

export default store;
