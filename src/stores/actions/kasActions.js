import axios from "axios";
import { TEST_URL } from "@config";
import { getValueJSON } from "@utils";

export const getDetailPerBulan = (event_id, month, year, state) => {
  return async (dispatch) => {
    let type;
    if (state === "refresh") {
      type = "SET_REFRESH";
    } else {
      type = "SET_MINI_LOADING";
    }

    dispatch({
      type: type,
      payload: true,
    });

    const data = await getValueJSON("@data");

    await axios({
      method: "GET",
      url: `${TEST_URL}/arus-kas/detail-per-month/${event_id}/${month}/${year}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${data.token}`,
      },
    })
      .then((response) => {
        dispatch({
          type: "SET_DETAIL_PER_BULAN",
          payload: response.data.result,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });

    dispatch({
      type: type,
      payload: false,
    });
  };
};

export const getDetailKas = (id, id_detail, state = "loading") => {
  return async (dispatch) => {
    let type;
    if (state === "refresh") {
      type = "SET_REFRESH";
    } else {
      type = "SET_MINI_LOADING";
    }

    dispatch({
      type: type,
      payload: true,
    });

    const data = await getValueJSON("@data");

    await axios({
      method: "GET",
      url: `${TEST_URL}/arus-kas/${id}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${data.token}`,
      },
    })
      .then((response) => {
        dispatch({
          type: "SET_DETAIL_KAS",
          payload: response.data.result,
        });

        dispatch({
          type: "SET_ID_DETAIL_KAS",
          payload: id,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });

    dispatch({
      type: type,
      payload: false,
    });
  };
};

export const getArusKasBulanIni = (event_id) => {
  return async (dispatch) => {
    const data = await getValueJSON("@data");

    await axios({
      method: "get",
      url: `${TEST_URL}/arus-kas/event/${event_id}/list-and-month`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${data.token}`,
      },
    })
      .then((response) => {
        const result = response.data.result;

        let dataPemasukan = 0;
        let dataPengeluaran = 0;
        result.map((data) => {
          if (parseInt(data.jenis)) dataPemasukan += parseInt(data.nominal);
          else dataPengeluaran += parseInt(data.nominal);
        });

        dispatch({
          type: "SET_ARUS_KAS",
          payload: {
            data: result,
            pemasukan: dataPemasukan,
            pengeluaran: dataPengeluaran,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getListKas = (group_id, id_list_kas, state = "loading") => {
  return async (dispatch) => {
    let type;
    if (state === "refresh") {
      type = "SET_REFRESH";
    } else {
      type = "SET_MINI_LOADING";
    }

    if (group_id != id_list_kas) {
      dispatch({
        type: type,
        payload: true,
      });
    }

    const data = await getValueJSON("@data");

    await axios({
      method: "GET",
      url: `${TEST_URL}/event-kas/group/${group_id}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${data.token}`,
      },
    })
      .then((response) => {
        const result = response.data.result;
        dispatch({
          type: "SET_LIST_KAS",
          payload: {
            data: result.event,
            pemasukan: result.pemasukan,
            pengeluaran: result.pengeluaran,
            total: result.total,
          },
        });

        dispatch({
          type: "SET_ID_LIST_KAS",
          payload: group_id
        });
      })
      .catch((error) => {
        console.log(error.message);
      });

    if (group_id != id_list_kas) {
      dispatch({
        type: type,
        payload: false,
      });
    }
  };
};
