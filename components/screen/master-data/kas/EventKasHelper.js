import { useState } from "react";
import axios from "axios";
import { TEST_URL } from "@env";
import { useDispatch, useSelector } from "react-redux";

const EventKasHelper = (navigation) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [dataEvent, setDataEvent] = useState([]);
  const [dataEventCadangan, setDataEventCadangan] = useState([]);
  const [loadDataEvent, setLoadDataEvent] = useState(true);
  const [keyword, setKeyword] = useState("");

  const getEventKas = async () => {
    await axios({
      method: "GET",
      url: `${TEST_URL}/event-kas/group/1`,
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

    setLoadDataEvent(false);
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
    loadDataEvent,
    setLoadDataEvent,
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
