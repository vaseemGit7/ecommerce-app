import { createStore } from "redux";
import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import cartReducer from "./reducers/cartReducer";
import paramsReducer from "./reducers/paramsReducer";
import dataReducer from "./reducers/dataReducer";

const combinedReducer = combineReducers({
  userReducer: userReducer,
  cartReducer: cartReducer,
  paramsReducer: paramsReducer,
  dataReducer: dataReducer,
});

const store = createStore(combinedReducer);

export default store;
