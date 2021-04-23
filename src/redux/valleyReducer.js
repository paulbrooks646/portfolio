const initialState = {
  valley: [],
};

const GET_VALLEY = "GET_VALLEY";

export function getValley(data) {
  return {
    type: GET_VALLEY,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_VALLEY:
      return { ...state, valley: action.payload };

    default:
      return state;
  }
}
