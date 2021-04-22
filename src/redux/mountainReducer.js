const initialState = {
  mountain: [],
};

const GET_MOUNTAIN = "GET_MOUNTAIN";

export function getMountain(data) {
  return {
    type: GET_MOUNTAIN,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MOUNTAIN:
      return { ...state, mountain: action.payload };

    default:
      return state;
  }
}
