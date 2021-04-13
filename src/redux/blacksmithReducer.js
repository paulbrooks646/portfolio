const initialState = {
  blacksmith: [],
};

const GET_BLACKSMITH = "GET_BLACKSMITH";

export function getBlacksmith(data) {
  return {
    type: GET_BLACKSMITH,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BLACKSMITH:
      return { ...state, blacksmith: action.payload };

    default:
      return state;
  }
}
