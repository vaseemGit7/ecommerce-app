import { createStore } from "redux";
import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import cartReducer from "./reducers/cartReducer";

const combinedReducer = combineReducers({
  userReducer: userReducer,
  cartReducer: cartReducer,
});

const store = createStore(combinedReducer);

export default store;
