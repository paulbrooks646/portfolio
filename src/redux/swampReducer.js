const initialState = {
  swamp: [],
};

const GET_SWAMP = "GET_SWAMP";

export function getSwamp(data) {
  return {
    type: GET_SWAMP,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SWAMP:
      return { ...state, swamp: action.payload };

    default:
      return state;
  }
}
