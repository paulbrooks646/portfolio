const initialState = {
  cave: [],
};

const GET_CAVE = "GET_CAVE";

export function getCave(data) {
  return {
    type: GET_CAVE,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CAVE:
      return { ...state, cave: action.payload };

    default:
      return state;
  }
}
