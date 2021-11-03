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
  const [keyword, setKeyword] = useState("");
  const [input, setInput] = useState({
    nama: "",
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
    input,
    setInput,
    keyword,
    setKeyword,
    getDataGroup,
    filterData
  };
};

export default GroupHelper;
