import { createStore, applyMiddleware, combineReducers } from "redux";
import userReducer from "./userReducer";
import inventoryReducer from "./inventoryReducer";
import castleReducer from "./castleReducer"
import stablesReducer from "./stablesReducer"
import gardenReducer from "./gardenReducer"
import towerReducer from "./towerReducer"
import promiseMiddleware from "redux-promise-middleware";


const rootReducer = combineReducers({
  user: userReducer,
  inventory: inventoryReducer,
  castle: castleReducer,
  stables: stablesReducer,
  garden: gardenReducer,
  tower: towerReducer
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
