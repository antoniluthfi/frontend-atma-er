const initialState = {
  show: false,
}

export const selectReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SHOW_SELECT":
      return action.payload;
    default:
      return state;
  }
};
