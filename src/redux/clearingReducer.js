const initialState = {
  clearing: [],
};

const GET_CLEARING = "GET_CLEARING";

export function getClearing(data) {
  return {
    type: GET_CLEARING,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CLEARING:
      return { ...state, clearing: action.payload };

    default:
      return state;
  }
}
