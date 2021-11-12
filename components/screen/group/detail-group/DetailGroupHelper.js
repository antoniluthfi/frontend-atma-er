import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { TEST_URL } from "@env";

const DetailGroupHelper = (navigation) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [detailGroup, setDetailGroup] = useState([]);
  const [detailGroupCadangan, setDetailGroupCadangan] = useState([]);
  const [loadDetailGroup, setLoadDetailGroup] = useState(true);
  const [refreshDetailGroup, setRefreshDetailGroup] = useState(false);
  const [keyword, setKeyword] = useState("");

  const formValidasi = (values) => {
    let alert;

    if (!values.name) alert = "Nama nya masih kosong tuh, isi dulu yaa";
    else if (!values.email) alert = "Email nya masih kosong tuh, isi dulu yaa";
    else if (!values.alamat)
      alert = "Alamat nya masih kosong tuh, isi dulu yaa";
    else if (!values.nomorhp)
      alert = "Nomor HP nya masih kosong tuh, isi dulu yaa";
    else if (!values.nomorhp)
      alert = "Nomor HP nya masih kosong tuh, isi dulu yaa";
    else if (!values.nama_ayah)
      alert = "Nama ayah nya masih kosong tuh, isi dulu yaa";
    else if (!values.nama_ibu)
      alert = "Nama ibu nya masih kosong tuh, isi dulu yaa";
    else if (!values.tempat_lahir)
      alert = "Tempat lahir nya masih kosong tuh, isi dulu yaa";
    else if (!values.tgl_lahir)
      alert = "Tanggal lahir nya masih kosong tuh, isi dulu yaa";
    else if (!values.jenis_kelamin)
      alert = "Jenis kelamin nya masih kosong tuh, isi dulu yaa";
    else if (!values.status) alert = "Status nya diisi dulu yaa";

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

  const getDetailGroup = async (group_id, state = "loading") => {
    if (state === "refresh") {
      setRefreshDetailGroup(true);
    }

    await axios({
      method: "GET",
      url: `${TEST_URL}/user-group/list-user/${group_id}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        const result = response.data.result;
        setDetailGroup(result);
        setDetailGroupCadangan(result);
      })
      .catch((error) => {
        console.log(error);
      });

    if (state === "refresh") {
      setRefreshDetailGroup(false);
    } else {
      setLoadDetailGroup(false);
    }
  };

  const postDetailGroup = async (values) => {
    if (formValidasi(values)) {
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
    }
  };

  const updateDetailGroup = async (values, id) => {
    if (formValidasi(values)) {
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
    }
  };

  const hapusData = async (group_id, id) => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    await axios({
      method: "delete",
      url: `${TEST_URL}/user-group/${group_id}/${id}`,
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

  const filterData = (keyword) => {
    let val = detailGroupCadangan;
    if (keyword) {
      val = val.filter((item) => {
        return item.user.name.toLowerCase().match(keyword.toLowerCase());
      });
    }

    setDetailGroup(val);
  };

  return {
    detailGroup,
    setDetailGroup,
    loadDetailGroup,
    setLoadDetailGroup,
    refreshDetailGroup,
    setRefreshDetailGroup,
    getDetailGroup,
    postDetailGroup,
    updateDetailGroup,
    hapusData,
    keyword,
    setKeyword,
    filterData,
  };
};

export default DetailGroupHelper;
