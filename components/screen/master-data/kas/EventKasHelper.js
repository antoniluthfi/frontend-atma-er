import { useState } from "react";
import axios from "axios";
import { API_URL, TEST_URL } from "@env";
import { useSelector } from "react-redux";

const EventKasHelper = (navigation) => {
  const user = useSelector((state) => state.user);
  const [dataEvent, setDataEvent] = useState([]);
  const [loadDataEvent, setLoadDataEvent] = useState(true);

  const getEventKas = async () => {
    console.log("event kas");
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

  const postEventKas = async (values) => {
    await axios({
      method: "post",
      url: `${TEST_URL}/event-kas`,
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
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
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
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    dataEvent,
    setDataEvent,
    loadDataEvent,
    setLoadDataEvent,
    getEventKas,
    updateEvent,
    postEventKas,
  };
};

export default EventKasHelper;
