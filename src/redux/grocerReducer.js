const initialState = {
  grocer: [],
};

const GET_GROCER = "GET_GROCER";

export function getGrocer(data) {
  return {
    type: GET_GROCER,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_GROCER:
      return { ...state, grocer: action.payload };

    default:
      return state;
  }
}
