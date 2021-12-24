const initialState = {
  id_list_kas: 0,
  list_kas: {
    data: [],
    pemasukan: 0,
    pengeluaran: 0,
    total: 0,
  },
  id_detail_kas: 0,
  detail_kas: {},
  id_detail_per_bulan: 0,
  detail_per_bulan: {},
  detail_per_user: [],
  arus_kas: {
    data: {},
    pemasukan: 0,
    pengeluaran: 0,
  },
};

export const kasReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LIST_KAS":
      return {
        ...state,
        list_kas: {
          data: action.payload.data,
          pemasukan: action.payload.pemasukan,
          pengeluaran: action.payload.pengeluaran,
          total: action.payload.total,
        },
      };
    case "SET_ID_DETAIL_KAS":
      return {
        ...state,
        id_detail_kas: action.payload,
      };
    case "SET_DETAIL_KAS":
      return {
        ...state,
        detail_kas: action.payload,
      };
    case "SET_ID_DETAIL_PER_BULAN":
      return {
        ...state,
        id_detail_per_bulan: action.payload,
      };
    case "SET_DETAIL_PER_BULAN":
      return {
        ...state,
        detail_per_bulan: action.payload,
      };
    case "SET_DETAIL_PER_USER":
      return {
        ...state,
        detail_per_user: action.payload,
      };
    case "SET_ARUS_KAS":
      return {
        ...state,
        arus_kas: {
          data: action.payload.data,
          pemasukan: action.payload.pemasukan,
          pengeluaran: action.payload.pengeluaran,
        },
      };
    default:
      return state;
  }
};
