import { useState } from "react";
import axios from "axios";
import { TEST_URL } from "@env";
import { useDispatch, useSelector } from "react-redux";

const PendingHelper = (navigation) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [listPending, setListPending] = useState({ data: [], total: 0 });
  const [listPendingCadangan, setListPendingCadangan] = useState({});
  const [keyword, setKeyword] = useState("");

  const getListPending = async (group_id, state = "loading") => {
    if (state === "refresh") {
      setRefresh(true);
    }

    await axios({
      method: "GET",
      url: `${TEST_URL}/user-group/list-pending/${group_id}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        const result = response.data.result;
        setListPending(result);
        setListPendingCadangan(result);
      })
      .catch((error) => {
        console.log(error);
      });

    if (state === "refresh") {
      setRefresh(false);
    } else {
      setLoading(false);
    }
  };

  const accGrup = async (values) => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    await axios({
      method: "PUT",
      url: `${TEST_URL}/user-group/${values.group_id}/${values.user_id}`,
      data: values,
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
            message: "Berhasil",
          },
        });

        getListPending(values.group_id);
      })
      .catch((error) => {
        console.log(error);
      });

    dispatch({
      type: "SET_LOADING",
      payload: false,
    });
  };

  const rejectGrup = async (values) => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    await axios({
      method: "DELETE",
      url: `${TEST_URL}/user-group/${values.group_id}/${values.user_id}`,
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
            message: "Berhasil",
          },
        });

        getListPending(values.group_id);
      })
      .catch((error) => {
        console.log(error);
      });

    dispatch({
      type: "SET_LOADING",
      payload: false,
    });
  };

  const filterData = (keyword) => {
    let val = listPendingCadangan.data;

    if (keyword) {
      val = val.filter((item) => {
        return (
          item.user.name.toLowerCase().match(keyword.toLowerCase()) ||
          item.group.nama.toLowerCase().match(keyword.toLowerCase())
        );
      });
    }

    setListPending({
      ...listPendingCadangan,
      data: val,
    });
  };

  return {
    loading,
    setLoading,
    refresh,
    setRefresh,
    listPending,
    setListPending,
    keyword,
    setKeyword,
    getListPending,
    filterData,
    accGrup,
    rejectGrup,
  };
};

export default PendingHelper;
