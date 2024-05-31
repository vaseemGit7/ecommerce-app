import { createStore } from "redux";
import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import cartReducer from "./reducers/cartReducer";
import paramsReducer from "./reducers/paramsReducer";

const combinedReducer = combineReducers({
  userReducer: userReducer,
  cartReducer: cartReducer,
  paramsReducer: paramsReducer,
});

const store = createStore(combinedReducer);

export default store;
