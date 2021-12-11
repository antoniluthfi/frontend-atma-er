import axios from "axios";
import { TEST_URL } from "@config";
import { useSelector, useDispatch } from "react-redux";

const DataDiriHelper = (navigation) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const formValidasi = (values) => {
    let message;
    if (!values.name) message = "Nama harus diisi!";
    else if (!values.email) message = "Email harus diisi!";
    else if (!values.alamat) message = "Alamat harus diisi!";
    else if (!values.nomorhp) message = "Nomor hp harus diisi!";
    else if (!values.nama_ayah) message = "Nama ayah harus diisi!";
    else if (!values.nama_ibu) message = "Nama ibu harus diisi!";
    else if (!values.tempat_lahir) message = "Tempat lahir harus diisi!";
    else if (!values.tgl_lahir) message = "Tanggal lahir harus diisi!";
    else if (!values.jenis_kelamin) message = "Jenis kelamin harus diisi!";
    else if (!values.status) message = "Status harus diisi!";

    if (message) {
      dispatch({
        type: "SET_SHOW_ALERT",
        payload: {
          type: "success",
          show: true,
          message: message,
        },
      });

      return false;
    }

    return true;
  };

  const postDataDiri = async (values) => {
    if (formValidasi(values)) {
      dispatch({
        type: "SET_LOADING",
        payload: true,
      });

      await axios({
        method: "PUT",
        url: `${TEST_URL}/user/${user.data.id}`,
        data: values,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => {
          dispatch({
            type: "LOGIN",
            payload: {
              user: response.data.result,
              token: user.token,
            },
          });

          navigation.navigate("ProfileStackNavigator", { screen: "Group" });
        })
        .catch((err) => {
          alert(err.message);
        });

      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    }
  };

  return {
    postDataDiri,
  };
};

export default DataDiriHelper;
