const initialState = {
  nest: [],
};

const GET_NEST = "GET_NEST";

export function getNest(data) {
  return {
    type: GET_NEST,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_NEST:
      return { ...state, nest: action.payload };

    default:
      return state;
  }
}
