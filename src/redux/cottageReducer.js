const initialState = {
  cottage: [],
};

const GET_COTTAGE = "GET_COTTAGE";

export function getCottage(data) {
  return {
    type: GET_COTTAGE,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COTTAGE:
      return { ...state, cottage: action.payload };

    default:
      return state;
  }
}
