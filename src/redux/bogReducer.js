const initialState = {
  bog: [],
};

const GET_BOG = "GET_BOG";

export function getBog(data) {
  return {
    type: GET_BOG,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BOG:
      return { ...state, bog: action.payload };

    default:
      return state;
  }
}
