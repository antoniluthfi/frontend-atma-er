import { useState } from "react";
import axios from "axios";
import { TEST_URL } from "@config";
import { useDispatch, useSelector } from "react-redux";

const EventKasHelper = (navigation) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [dataEvent, setDataEvent] = useState({
    event: [],
    pemasukan: 0,
    pengeluaran: 0,
    total: 0,
  });
  const [dataEventCadangan, setDataEventCadangan] = useState({
    event: [],
    pemasukan: 0,
    pengeluaran: 0,
    total: 0,
  });
  const [loadDataEvent, setLoadDataEvent] = useState(true);
  const [refreshDataEvent, setRefreshDataEvent] = useState(false);
  const [indexGroup, setIndexGroup] = useState(1);
  const [keyword, setKeyword] = useState("");

  const getEventKas = async (state = "loading") => {
    if (state === "refresh") {
      setRefreshDataEvent(true);
    }

    await axios({
      method: "GET",
      url: `${TEST_URL}/event-kas/group/${indexGroup}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        const result = response.data.result;
        setDataEvent(result);
        setDataEventCadangan(result);
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

  const postEventKas = async (values) => {
    await axios({
      method: "post",
      url: `${TEST_URL}/event-kas`,
      data: {
        nama: values.nama,
        status: values.status,
        group_id: values.grup,
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
  };

  const updateEvent = async (id, values) => {
    await axios({
      method: "put",
      url: `${TEST_URL}/event-kas/${id}`,
      data: {
        nama: values.nama,
        status: values.status,
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
  };

  const deleteEventKas = async (id) => {
    await axios({
      method: "delete",
      url: `${TEST_URL}/event-kas/${id}`,
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

        getEventKas();
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
  };

  const filterData = (keyword) => {
    let val = dataEventCadangan;
    if (keyword) {
      val = val.filter((item) => {
        return item.nama.toLowerCase().match(keyword.toLowerCase());
      });
    }

    setDataEvent(val);
  };

  return {
    dataEvent,
    setDataEvent,
    setDataEventCadangan,
    loadDataEvent,
    setLoadDataEvent,
    refreshDataEvent,
    setRefreshDataEvent,
    keyword,
    setKeyword,
    getEventKas,
    postEventKas,
    updateEvent,
    deleteEventKas,
    filterData,
  };
};

export default EventKasHelper;
