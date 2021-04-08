const initialState = {
  stables: [],
};

const GET_STABLES = "GET_STABLEs";

export function getStables(data) {
  return {
    type: GET_STABLES,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_STABLES:
      return { ...state, stables: action.payload };

    default:
      return state;
  }
}
