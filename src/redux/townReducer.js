const initialState = {
  town: [],
};

const GET_TOWN = "GET_TOWN";

export function getTown(data) {
  return {
    type: GET_TOWN,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TOWN:
      return { ...state, town: action.payload };

    default:
      return state;
  }
}
