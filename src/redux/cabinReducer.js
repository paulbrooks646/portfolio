const initialState = {
  cabin: [],
};

const GET_CABIN = "GET_CABIN";

export function getCabin(data) {
  return {
    type: GET_CABIN,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CABIN:
      return { ...state, cabin: action.payload };

    default:
      return state;
  }
}
