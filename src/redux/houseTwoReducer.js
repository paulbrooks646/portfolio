const initialState = {
  houseTwo: [],
};

const GET_HOUSETWO = "GET_HOUSETWO";

export function getHouseTwo(data) {
  return {
    type: GET_HOUSETWO,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_HOUSETWO:
      return { ...state, houseTwo: action.payload };

    default:
      return state;
  }
}
