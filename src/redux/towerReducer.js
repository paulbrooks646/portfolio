const initialState = {
  tower: [],
};

const GET_TOWER = "GET_TOWER";

export function getTower(data) {
  return {
    type: GET_TOWER,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TOWER:
      return { ...state, tower: action.payload };

    default:
      return state;
  }
}
