const initialState = {
  store: [],
};

const GET_STORE = "GET_STORE";

export function getStore(data) {
  return {
    type: GET_STORE,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_STORE:
      return { ...state, store: action.payload };

    default:
      return state;
  }
}
