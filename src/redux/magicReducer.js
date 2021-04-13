const initialState = {
  magic: [],
};

const GET_MAGIC = "GET_MAGIC";

export function getMagic(data) {
  return {
    type: GET_MAGIC,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MAGIC:
      return { ...state, magic: action.payload };

    default:
      return state;
  }
}
