const initialState = {
  houseFour: [],
};

const GET_HOUSEFOUR = "GET_HOUSEFOUR";

export function getHouseFour(data) {
  return {
    type: GET_HOUSEFOUR,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_HOUSEFOUR:
      return { ...state, houseFour: action.payload };

    default:
      return state;
  }
}
