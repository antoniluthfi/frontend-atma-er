const initialState = {
  barBottom: 40,
  indicatorBottom: 98,
};

export const tabBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SHOW_TAB":
      return action.payload;
    default:
      return state;
  }
};
