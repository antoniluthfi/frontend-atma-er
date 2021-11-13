import { useState } from "react";
import { TEST_URL } from "@env";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const GroupHelper = (navigation) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [dataGroup, setDataGroup] = useState([]);
  const [dataGroupCadangan, setDataGroupCadangan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [input, setInput] = useState({
    nama: "",
  });

  const formValidasi = (values) => {
    let alert;
    if (!values.nama) alert = "Nama grup harus diisi!";
    else if (!values.deskripsi) alert = "Deskripsi grup harus diisi!";
    else if (user.hak_akses === "administrator" && !values.status)
      alert = "Status harus pilih salah satu!";

    if (alert) {
      dispatch({
        type: "SET_SHOW_ALERT",
        payload: {
          type: "failed",
          show: true,
          message: alert,
        },
      });

      return false;
    }

    return true;
  };

  const getDataGroup = async (state = "loading") => {
    if (state === "refresh") {
      setRefresh(true);
    }

    await axios({
      method: "GET",
      url: `${TEST_URL}/group/${user.data.id}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        const result = response.data.result;
        setDataGroup(result);
        setDataGroupCadangan(result);
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

  const postDataGroup = async (values) => {
    if (formValidasi(values)) {
      dispatch({
        type: "SET_LOADING",
        payload: true,
      });

      await axios({
        method: "POST",
        url: `${TEST_URL}/group`,
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
              message: response.data.message
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });

      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    }
  };

  const updateFotoProfil = async (values, id) => {
    let formData = new FormData();
    formData.append("file", values);

    await axios({
      method: "put",
      url: `${TEST_URL}/group/foto-profil/${id}`,
      data: formData,
      headers: {
        Accept: "application/json",
        ContentType: "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filterData = (keyword) => {
    let val = dataGroupCadangan;
    if (keyword) {
      val = val.filter((item) => {
        return item.nama.toLowerCase().match(keyword.toLowerCase());
      });
    }

    setDataGroup(val);
  };

  return {
    user,
    dataGroup,
    setDataGroup,
    loading,
    setLoading,
    refresh,
    setRefresh,
    input,
    setInput,
    keyword,
    setKeyword,
    getDataGroup,
    updateFotoProfil,
    postDataGroup,
    filterData,
  };
};

export default GroupHelper;
