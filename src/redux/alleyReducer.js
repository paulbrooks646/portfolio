const initialState = {
  alley: [],
};

const GET_ALLEY = "GET_ALLEY";

export function getAlley(data) {
  return {
    type: GET_ALLEY,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALLEY:
      return { ...state, alley: action.payload };

    default:
      return state;
  }
}
