import axios from "axios"

const initialState = {
  inventory: [],
};

const GET_INVENTORY = "GET_INVENTORY";

export function getInventory(data) {
  
  return {
    type: GET_INVENTORY,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_INVENTORY:
      return { ...state, inventory: action.payload };

    default:
      return state;
  }
}
