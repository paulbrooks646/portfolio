const initialState = {
  maze: [],
};

const GET_MAZE = "GET_MAZE";

export function getMaze(data) {
  return {
    type: GET_MAZE,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MAZE:
      return { ...state, maze: action.payload };

    default:
      return state;
  }
}
