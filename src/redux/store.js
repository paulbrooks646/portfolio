import { createStore, applyMiddleware, combineReducers } from "redux";
import blacksmithReducer from "./blacksmithReducer";
import bogReducer from "./bogReducer";
import cabinReducer from "./cabinReducer";
import caveReducer from "./caveReducer";
import castleReducer from "./castleReducer";
import clearingReducer from "./clearingReducer";
import cottageReducer from "./cottageReducer";
import gardenReducer from "./gardenReducer";
import gladeReducer from "./gladeReducer";
import grocerReducer from "./grocerReducer";
import houseFiveReducer from "./houseFiveReducer";
import houseFourReducer from "./houseFourReducer";
import houseOneReducer from "./houseOneReducer";
import houseThreeReducer from "./houseThreeReducer";
import houseTwoReducer from "./houseTwoReducer";
import inventoryReducer from "./inventoryReducer";
import magicReducer from "./magicReducer";
import mazeReducer from "./mazeReducer";
import nestReducer from "./nestReducer";
import passReducer from "./passReducer";
import stablesReducer from "./stablesReducer";
import storeReducer from "./storeReducer";
import thievesReducer from "./thievesReducer";
import towerReducer from "./towerReducer";
import userReducer from "./userReducer";
import promiseMiddleware from "redux-promise-middleware";

const rootReducer = combineReducers({
  blacksmith: blacksmithReducer,
  bog: bogReducer,
  cabin: cabinReducer,
  castle: castleReducer,
  cave: caveReducer,
  clearing: clearingReducer,
  cottage: cottageReducer,
  garden: gardenReducer,
  glade: gladeReducer,
  grocer: grocerReducer,
  houseFive: houseFiveReducer,
  houseFour: houseFourReducer,
  houseOne: houseOneReducer,
  houseThree: houseThreeReducer,
  houseTwo: houseTwoReducer,
  inventory: inventoryReducer,
  magic: magicReducer,
  maze: mazeReducer,
  nest: nestReducer,
  pass: passReducer,
  stables: stablesReducer,
  store: storeReducer,
  thieves: thievesReducer,
  tower: towerReducer,
  user: userReducer,
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
