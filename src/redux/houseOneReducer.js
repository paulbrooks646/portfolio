const initialState = {
  houseOne: [],
};

const GET_HOUSEONE = "GET_HOUSEONE";

export function getHouseOne(data) {
  return {
    type: GET_HOUSEONE,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_HOUSEONE:
      return { ...state, houseOne: action.payload };

    default:
      return state;
  }
}
