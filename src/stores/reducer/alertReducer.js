const initialState = {
  type: null,
  show: false,
  message: ""
}

export const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SHOW_ALERT":
      return action.payload;
    default:
      return state;
  }
};
