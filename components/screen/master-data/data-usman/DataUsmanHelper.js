import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { TEST_URL } from "@env";

const DataUsmanHelper = (navigation) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [dataUsman, setDataUsman] = useState([]);
  const [loadDataUsman, setLoadDataUsman] = useState(true);

  const getDataUsman = async () => {
    await axios({
      method: "GET",
      url: `${TEST_URL}/user`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        setDataUsman(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });

    setLoadDataUsman(false);
  };

  const postDataUsman = async (values) => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    await axios({
      method: "post",
      url: `${TEST_URL}/user`,
      data: values,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        navigation.goBack();
      })
      .catch((error) => {
        alert(error.message);
      });

    dispatch({
      type: "SET_LOADING",
      payload: false,
    });
  };

  const updateDataUsman = async (values, id) => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    await axios({
      method: "put",
      url: `${TEST_URL}/user/${id}`,
      data: values,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        navigation.goBack();
      })
      .catch((error) => {
        alert(error.message);
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
      url: `${TEST_URL}/user/${id}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        alert(error.message);
      });

    dispatch({
      type: "SET_LOADING",
      payload: false,
    });
  };

  return {
    dataUsman,
    setDataUsman,
    loadDataUsman,
    setLoadDataUsman,
    getDataUsman,
    postDataUsman,
    updateDataUsman,
    hapusData,
  };
};

export default DataUsmanHelper;
