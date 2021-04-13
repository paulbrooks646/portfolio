const initialState = {
  pass: [],
};

const GET_PASS = "GET_PASS";

export function getPass(data) {
  return {
    type: GET_PASS,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PASS:
      return { ...state, pass: action.payload };

    default:
      return state;
  }
}
