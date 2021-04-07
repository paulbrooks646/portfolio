
const initialState = {
  castle: [],
};

const GET_CASTLE = "GET_CASTLE";

export function getCastle(data) {
  return {
    type: GET_CASTLE,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CASTLE:
      return { ...state, castle: action.payload };

    default:
      return state;
  }
}
