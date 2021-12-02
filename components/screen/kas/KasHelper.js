import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { TEST_URL } from "@env";

const KasHelper = (navigation) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [dataEvent, setDataEvent] = useState([]);
  const [dataEventCadangan, setDataEventCadangan] = useState([]);
  const [loadDataEvent, setLoadDataEvent] = useState(true);
  const [refreshDataEvent, setRefreshDataEvent] = useState(false);
  const [detailKas, setDetailKas] = useState({});
  const [detailKasCadangan, setDetailKasCadangan] = useState({});
  const [loadDetailKas, setLoadDetailKas] = useState(true);
  const [refreshDetailKas, setRefreshDetailKas] = useState(false);
  const [detailPerUser, setDetailPerUser] = useState([]);
  const [loadDetailPerUser, setLoadDetailPerUser] = useState(true);
  const [logPenyetoran, setLogPenyetoran] = useState([]);
  const [loadLogPenyetoran, setLoadLogPenyetoran] = useState(true);
  const [logPengeluaran, setLogPengeluaran] = useState([]);
  const [loadLogPengeluaran, setLoadLogPengeluaran] = useState(true);
  const [dataUsers, setDataUsers] = useState([]);
  const [dataArusKas, setDataArusKas] = useState([]);
  const [pemasukan, setPemasukan] = useState(0);
  const [pengeluaran, setPengeluaran] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [rincianEvent, setRincianEvent] = useState({
    pemasukan: 0,
    pengeluaran: 0,
    total: 0,
  });

  const getListKas = async (group_id, state = "loading") => {
    if (state === "refresh") {
      setRefreshDataEvent(true);
    }

    await axios({
      method: "GET",
      url: `${TEST_URL}/event-kas/group/${group_id}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        const result = response.data.result;
        setDataEvent(result.event);
        setDataEventCadangan(result.event);
        setRincianEvent({
          pemasukan: result.pemasukan,
          pengeluaran: result.pengeluaran,
          total: result.total,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });

    if (state === "refresh") {
      setRefreshDataEvent(false);
    } else {
      setLoadDataEvent(false);
    }
  };

  const getDetailKas = async (id, state = "loading") => {
    if(state === "refresh") {
      setRefreshDetailKas(true);
    }

    await axios({
      method: "GET",
      url: `${TEST_URL}/arus-kas/${id}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        const result = response.data.result;
        setDetailKas(result);
        setDetailKasCadangan(result);
      })
      .catch((error) => {
        console.log(error.message);
      });

      if(state === "refresh") {
        setRefreshDetailKas(false);
      } else {
        setLoadDetailKas(false);
      }  
  };

  const getDetailPerUser = async (id, user_id) => {
    await axios({
      method: "GET",
      url: `${TEST_URL}/arus-kas/${id}/${user_id}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        setDetailPerUser(response.data.result);
      })
      .catch((error) => {
        alert(error.message);
      });

    setLoadDetailPerUser(false);
  };

  const getDataUsers = async (group_id) => {
    await axios({
      method: "GET",
      url: `${TEST_URL}/user-group/list-user/${group_id}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        setDataUsers(response.data.result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const setorKas = async (values) => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    await axios({
      method: "post",
      url: `${TEST_URL}/arus-kas`,
      data: {
        event_kas_id: values.event_kas_id,
        user_id: values.user_id,
        jenis: values.jenis,
        nominal: values.nominal,
        keterangan: values.keterangan,
        id_pj: user.data.id,
      },
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        dispatch({
          type: "SET_SHOW_ALERT",
          payload: {
            type: "success",
            show: true,
            message: response.data.message,
          },
        });

        navigation.goBack();
      })
      .catch((error) => {
        dispatch({
          type: "SET_SHOW_ALERT",
          payload: {
            type: "failed",
            show: true,
            message: error.message,
          },
        });
      });

    dispatch({
      type: "SET_LOADING",
      payload: false,
    });
  };

  const updateKas = async (values, id) => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    await axios({
      method: "put",
      url: `${TEST_URL}/arus-kas/${id}`,
      data: {
        event_kas_id: values.event_kas_id,
        user_id: values.user_id,
        jenis: values.jenis,
        nominal: values.nominal,
        keterangan: values.keterangan,
        id_pj: user.data.id,
      },
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        dispatch({
          type: "SET_SHOW_ALERT",
          payload: {
            type: "success",
            show: true,
            message: response.data.message,
          },
        });

        navigation.navigate("DetailKas", {
          title: values.event_name,
          id: values.event_kas_id,
        });
      })
      .catch((error) => {
        dispatch({
          type: "SET_SHOW_ALERT",
          payload: {
            type: "failed",
            show: true,
            message: error.message,
          },
        });
      });

    dispatch({
      type: "SET_LOADING",
      payload: false,
    });
  };

  const hapusData = async (id) => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    await axios({
      method: "delete",
      url: `${TEST_URL}/arus-kas/${id}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        dispatch({
          type: "SET_SHOW_ALERT",
          payload: {
            type: "success",
            show: true,
            message: response.data.message,
          },
        });
        navigation.goBack();
      })
      .catch((error) => {
        dispatch({
          type: "SET_SHOW_ALERT",
          payload: {
            type: "failed",
            show: true,
            message: error.message,
          },
        });
      });

    dispatch({
      type: "SET_LOADING",
      payload: false,
    });
  };

  const getLogKas = async (event_id) => {
    await axios({
      method: "get",
      url: `${TEST_URL}/arus-kas/event/${event_id}/list`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        const result = response.data.result;
        setLogPenyetoran(result.pemasukan);
        setLogPengeluaran(result.pengeluaran);
      })
      .catch((error) => {
        console.log(error);
      });

    setLoadLogPenyetoran(false);
    setLoadLogPengeluaran(false);
  };

  const getArusKasBulanIni = async (event_id) => {
    await axios({
      method: "get",
      url: `${TEST_URL}/arus-kas/event/${event_id}/list-and-month`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        const result = response.data.result;
        setDataArusKas(result);

        let dataPemasukan = 0;
        let dataPengeluaran = 0;
        result.map((data) => {
          if (parseInt(data.jenis)) dataPemasukan += parseInt(data.nominal);
          else dataPengeluaran += parseInt(data.nominal);
        });
        setPemasukan(dataPemasukan);
        setPengeluaran(dataPengeluaran);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filterKas = (keyword) => {
    let val = dataEventCadangan;

    if (keyword) {
      val = val.filter((item) => {
        return item.nama.toLowerCase().match(keyword.toLowerCase());
      });
    }

    setDataEvent(val);
  };

  const filterUser = (keyword) => {
    let val = detailKasCadangan.per_user;

    if (keyword) {
      val = val.filter((item) => {
        return item.users.name.toLowerCase().match(keyword.toLowerCase());
      });
    }

    setDetailKas({
      total: detailKasCadangan.total,
      bulan_ini: detailKasCadangan.bulan_ini,
      per_user: val,
    });
  };

  return {
    user,
    dataEvent,
    setDataEvent,
    loadDataEvent,
    setLoadDataEvent,
    refreshDataEvent,
    setRefreshDataEvent,
    detailKas,
    setDetailKas,
    loadDetailKas,
    setLoadDetailKas,
    refreshDetailKas,
    setRefreshDetailKas,
    detailPerUser,
    setDetailPerUser,
    loadDetailPerUser,
    setLoadDetailPerUser,
    logPenyetoran,
    setLogPenyetoran,
    loadLogPenyetoran,
    setLoadLogPenyetoran,
    logPengeluaran,
    setLogPengeluaran,
    loadLogPengeluaran,
    setLoadLogPengeluaran,
    dataUsers,
    setDataUsers,
    dataArusKas,
    setDataArusKas,
    pemasukan,
    setPemasukan,
    pengeluaran,
    setPengeluaran,
    keyword,
    setKeyword,
    rincianEvent,
    setRincianEvent,
    getListKas,
    getDetailKas,
    getDetailPerUser,
    filterUser,
    filterKas,
    getDataUsers,
    setorKas,
    updateKas,
    hapusData,
    getLogKas,
    getArusKasBulanIni,
  };
};

export default KasHelper;
