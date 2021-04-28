import { createStore, applyMiddleware, combineReducers } from "redux";
import alleyReducer from "./alleyReducer"
import blacksmithReducer from "./blacksmithReducer";
import bogReducer from "./bogReducer";
import cabinReducer from "./cabinReducer";
import caveReducer from "./caveReducer";
import castleReducer from "./castleReducer";
import clearingReducer from "./clearingReducer";
import cottageReducer from "./cottageReducer";
import dashboardReducer from "./dashboardReducer";
import dragonReducer from "./dragonReducer"
import forestReducer from "./forestReducer"
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
import marketReducer from "./marketReducer"
import mazeReducer from "./mazeReducer";
import mountainReducer from "./mountainReducer"
import nestReducer from "./nestReducer";
import passReducer from "./passReducer";
import stablesReducer from "./stablesReducer";
import storeReducer from "./storeReducer";
import swampReducer from "./swampReducer"
import thievesReducer from "./thievesReducer";
import towerReducer from "./towerReducer";
import townReducer from "./townReducer"
import userReducer from "./userReducer";
import valleyReducer from "./valleyReducer";
import promiseMiddleware from "redux-promise-middleware";

const rootReducer = combineReducers({
  alley: alleyReducer,
  blacksmith: blacksmithReducer,
  bog: bogReducer,
  cabin: cabinReducer,
  castle: castleReducer,
  cave: caveReducer,
  clearing: clearingReducer,
  cottage: cottageReducer,
  dashboard: dashboardReducer,
  dragon: dragonReducer,
  forest: forestReducer,
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
  market: marketReducer,
  maze: mazeReducer,
  mountain: mountainReducer,
  nest: nestReducer,
  pass: passReducer,
  stables: stablesReducer,
  store: storeReducer,
  swamp: swampReducer,
  thieves: thievesReducer,
  tower: towerReducer,
  town: townReducer,
  user: userReducer,
  valley: valleyReducer
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
