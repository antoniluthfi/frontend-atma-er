const initialState = {
  loading: false,
  mini_loading: false,
  refresh: false,
};

export const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_MINI_LOADING":
      return {
        ...state,
        mini_loading: action.payload,
      };
    case "SET_REFRESH":
      return {
        ...state,
        refresh: action.payload,
      };
    default:
      return state;
  }
};
