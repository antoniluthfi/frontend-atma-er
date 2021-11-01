const initialState = {
  barBottom: 5,
  indicatorBottom: 63,
  fabBottom: 60,
  fab2Bottom: 80,
};

export const tabBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SHOW_TAB":
      return action.payload;
    default:
      return state;
  }
};
