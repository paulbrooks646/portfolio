const initialState = {
  garden: [],
};

const GET_GARDEN = "GET_GARDEN";

export function getGarden(data) {
  return {
    type: GET_GARDEN,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_GARDEN:
      return { ...state, garden: action.payload };

    default:
      return state;
  }
}
