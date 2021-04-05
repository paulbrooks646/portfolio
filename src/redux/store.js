import { createStore, applyMiddleware, combineReducers } from "redux";
import userReducer from "./userReducer";
import inventoryReducer from "./inventoryReducer";
import promiseMiddleware from "redux-promise-middleware";

const rootReducer = combineReducers({
  user: userReducer,
  inventory: inventoryReducer,
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
