const initialState = {
  thieves: [],
};

const GET_THIEVES = "GET_THIEVES";

export function getThieves(data) {
  return {
    type: GET_THIEVES,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_THIEVES:
      return { ...state, thieves: action.payload };

    default:
      return state;
  }
}