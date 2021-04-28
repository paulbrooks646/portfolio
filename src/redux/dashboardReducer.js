const initialState = {
  dashboard: [],
};

const GET_DASHBOARD = "GET_DASHBOARD";

export function getDashboard(data) {
  return {
    type: GET_DASHBOARD,
    payload: data,
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DASHBOARD:
      return { ...state, dashboard: action.payload };

    default:
      return state;
  }
}
