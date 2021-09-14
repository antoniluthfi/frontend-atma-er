const initialState = {
  data: null,
  token: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
    case "LOGOUT":
      return {
        data: action.payload.user,
        token: action.payload.token,
      };
    default:
      return state;
  }
};
