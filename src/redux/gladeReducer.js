const initialState = {
  glade: [],
};

const GET_GLADE = "GET_GLADE";

export function getGlade(data) {
  return {
    type: GET_GLADE,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_GLADE:
      return { ...state, glade: action.payload };

    default:
      return state;
  }
}
