import { createStore, applyMiddleware, combineReducers } from "redux";
import inventoryReducer from "./inventoryReducer";
import userReducer from "./userReducer";
import promiseMiddleware from "redux-promise-middleware";

const rootReducer = combineReducers({
  inventory: inventoryReducer,
  user: userReducer,
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
