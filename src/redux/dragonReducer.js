const initialState = {
  dragon: [],
};

const GET_DRAGON = "GET_DRAGON";

export function getDragon(data) {
  return {
    type: GET_DRAGON,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DRAGON:
      return { ...state, dragon: action.payload };

    default:
      return state;
  }
}
