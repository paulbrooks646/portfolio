const initialState = {
  houseFive: [],
};

const GET_HOUSEFIVE = "GET_HOUSEFIVE";

export function getHouseFive(data) {
  return {
    type: GET_HOUSEFIVE,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_HOUSEFIVE:
      return { ...state, houseFive: action.payload };

    default:
      return state;
  }
}
