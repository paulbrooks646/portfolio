const initialState = {
  houseThree: [],
};

const GET_HOUSETHREE = "GET_HOUSETHREE";

export function getHouseThree(data) {
  return {
    type: GET_HOUSETHREE,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_HOUSETHREE:
      return { ...state, houseThree: action.payload };

    default:
      return state;
  }
}
