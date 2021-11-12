import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { TEST_URL } from "@env";

const UserHelper = (navigation) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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

  const updateUser = async (values, id) => {
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
          dispatch({
            type: "LOGIN",
            payload: {
              user: response.data.result,
              token: user.token,
            },
          });

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

  return {
    updateUser,
  };
};

export default UserHelper;
