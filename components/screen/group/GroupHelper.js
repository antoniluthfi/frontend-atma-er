import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const GroupHelper = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [dataGroup, setDataGroup] = useState([]);
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
      url: `${TEST_URL}/group`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        setDataGroup(response.data.result);
      })
      .catch((error) => {
        console.log("gagal get data group");
      });

    setLoading(false);
  };

  return {
    loading, 
    dataGroup,
    setDataGroup,
    input,
    setInput,
    getDataGroup,
  }
};

export default GroupHelper;
