import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { TEST_URL } from "@env";

const KasHelper = (navigation) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [dataEvent, setDataEvent] = useState([]);
  const [loadDataEvent, setLoadDataEvent] = useState(true);
  const [detailKas, setDetailKas] = useState({});
  const [detailKasCadangan, setDetailKasCadangan] = useState({});
  const [loadDetailKas, setLoadDetailKas] = useState(true);
  const [detailPerUser, setDetailPerUser] = useState([]);
  const [loadDetailPerUser, setLoadDetailPerUser] = useState(true);
  const [logPenyetoran, setLogPenyetoran] = useState([]);
  const [loadLogPenyetoran, setLoadLogPenyetoran] = useState(true);
  const [belumBayar, setBelumBayar] = useState([]);
  const [loadBelumBayar, setLoadBelumBayar] = useState(true);
  const [dataUsers, setDataUsers] = useState([]);
  const [keyword, setKeyword] = useState("");

  const getListKas = async () => {
    console.log("list kas");
    await axios({
      method: "GET",
      url: `${TEST_URL}/event-kas`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        setDataEvent(response.data.result);
      })
      .catch((error) => {
        console.log(error.message);
      });

    setLoadDataEvent(false);
  };

  const getDetailKas = async (id) => {
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
        alert(error.message);
      });

    setLoadDetailKas(false);
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

  const getDataUsers = async () => {
    await axios({
      method: "GET",
      url: `${TEST_URL}/user`,
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
        users_id: values.users_id,
        jenis: 1,
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
        alert(response.data.message);
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error.message);
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
        users_id: values.users_id,
        jenis: 1,
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
        alert(response.data.message);
        navigation.navigate("DetailKas", {
          title: values.event_name,
          id: values.event_kas_id,
        });
      })
      .catch((error) => {
        console.log(error.message);
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
        alert(response.data.message);
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error.message);
      });

    dispatch({
      type: "SET_LOADING",
      payload: false,
    });
  };

  const getLogPenyetoran = async (event_id) => {
    await axios({
      method: "get",
      url: `${TEST_URL}/arus-kas/event/${event_id}/list`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        setLogPenyetoran(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });

    setLoadLogPenyetoran(false);
  };

  const getBelumBayarKas = async (event_id) => {
    await axios({
      method: "get",
      url: `${TEST_URL}/arus-kas/list/belum-bayar/${event_id}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        const result = response.data.result;
        const data = result.users.filter((item) => {
          for (let i = 0; i < result.length; i++) {
            return item.id != result[i].users_id;
          }
        });

        setBelumBayar(data);
      })
      .catch((error) => {
        console.log(error);
      });

    setLoadBelumBayar(false);
  };

  const filter = (keyword) => {
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
    dataEvent,
    setDataEvent,
    loadDataEvent,
    setLoadDataEvent,
    detailKas,
    setDetailKas,
    loadDetailKas,
    setLoadDetailKas,
    detailPerUser,
    setDetailPerUser,
    loadDetailPerUser,
    setLoadDetailPerUser,
    logPenyetoran,
    setLogPenyetoran,
    loadLogPenyetoran,
    setLoadLogPenyetoran,
    belumBayar,
    setBelumBayar,
    loadBelumBayar,
    setLoadBelumBayar,
    dataUsers,
    setDataUsers,
    keyword,
    setKeyword,
    getListKas,
    getDetailKas,
    getDetailPerUser,
    filter,
    getDataUsers,
    setorKas,
    updateKas,
    hapusData,
    getLogPenyetoran,
    getBelumBayarKas,
  };
};

export default KasHelper;
