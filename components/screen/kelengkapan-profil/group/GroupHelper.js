import { useState } from "react";
import axios from "axios";
import { TEST_URL } from "@env";
import { useSelector, useDispatch } from "react-redux";

const GroupHelper = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [dataGroup, setDataGroup] = useState([]);
  const [dataGroupCadangan, setDataGroupCadangan] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [input, setInput] = useState({
    nama: "",
    deskripsi: "",
    jumlah_anggota: "",
    foto_profil: "",
    status: "",
  });

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

  const daftarGroup = async (values) => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    await axios({
      method: "POST",
      url: `${TEST_URL}/user-group`,
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
            message:
              "Berhasil mendaftar, silahkan tunggu konfirmasi dari admin grup",
          },
        });
        getDataGroup();
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
    loading,
    setLoading,
    refresh,
    setRefresh,
    dataGroup,
    setDataGroup,
    keyword,
    setKeyword,
    input,
    setInput,
    getDataGroup,
    daftarGroup,
    filterData,
  };
};

export default GroupHelper;
