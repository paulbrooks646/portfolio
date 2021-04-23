const initialState = {
  forest: [],
};

const GET_FOREST = "GET_FOREST";

export function getForest(data) {
  return {
    type: GET_FOREST,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FOREST:
      return { ...state, forest: action.payload };

    default:
      return state;
  }
}
