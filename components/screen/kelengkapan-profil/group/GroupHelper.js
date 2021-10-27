import { useState } from "react";
import axios from "axios";
import { TEST_URL } from "@env";
import { useSelector, useDispatch } from "react-redux";

const GroupHelper = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
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

  const getDataGroup = async () => {
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

    setLoading(false);
  };

  const daftarGroup = async (values) => {
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
        alert("Berhasil mendaftar, silahkan tunggu konfirmasi dari admin grup");
        setLoading(true);
        getDataGroup();
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
    loading,
    setLoading,
    dataGroup,
    setDataGroup,
    keyword,
    setKeyword,
    input,
    setInput,
    getDataGroup,
    daftarGroup,
    filterData
  };
};

export default GroupHelper;
