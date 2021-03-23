const initialState = {
  game: [],
};

const GET_GAME = "GET_GAME";

export function getGame(data) {
  return {
    type: GET_GAME,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_GAME:
      return { ...state, game: action.payload };

    default:
      return state;
  }
}
