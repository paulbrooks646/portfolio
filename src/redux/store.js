import { createStore, applyMiddleware, combineReducers } from "redux";
import userReducer from "./userReducer";
import gameReducer from "./gameReducer";
import promiseMiddleware from "redux-promise-middleware";

const rootReducer = combineReducers({
  user: userReducer,
  game: gameReducer,
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
