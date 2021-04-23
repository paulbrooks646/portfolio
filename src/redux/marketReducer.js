const initialState = {
  market: [],
};

const GET_MARKET = "GET_MARKET";

export function getMarket(data) {
  return {
    type: GET_MARKET,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MARKET:
      return { ...state, market: action.payload };

    default:
      return state;
  }
}
