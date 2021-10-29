import axios from "axios";
import { useDispatch } from "react-redux";
import { TEST_URL } from "@env";

const AuthHelper = (navigation) => {
  const dispatch = useDispatch();

  const login = async (values) => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    let alert;
    if (!values.email) alert = "Email harus diisi!";
    else if (!values.password) alert = "Password harus diisi!";

    if (alert) {
      dispatch({
        type: "SET_SHOW_ALERT",
        payload: {
          type: "failed",
          show: true,
          message: alert,
        },
      });
    } else {
      await axios({
        method: "post",
        url: `${TEST_URL}/login`,
        data: {
          email: values.email,
          password: values.password,
        },
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          dispatch({
            type: "LOGIN",
            payload: response.data.success,
          });

          dispatch({
            type: "SET_SHOW_ALERT",
            payload: {
              type: "success",
              show: true,
              message: "Login berhasil",
            },
          });
        })
        .catch((error) => {
          let message;
          const statusCode = error.response.status;
          if (statusCode >= 400 && statusCode < 500) {
            message = "Email tidak dapat ter-otorisasi, silahkan login lagi";
          } else if (statusCode >= 500) {
            message =
              "Maaf server kami sedang mengalami gangguan, silahkan login lagi nanti";
          }

          dispatch({
            type: "SET_SHOW_ALERT",
            payload: {
              type: "failed",
              show: true,
              message: message,
            },
          });
        });

      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    }
  };

  const register = async (values) => {
    await axios({
      method: "post",
      url: `${TEST_URL}/register`,
      data: {
        name: values.name,
        nomorhp: values.nomorhp,
        email: values.email,
        password: values.password,
        c_password: values.c_password,
      },
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        navigation.navigate("Login");
        dispatch({
          type: "SET_SHOW_ALERT",
          payload: {
            type: "failed",
            show: true,
            message: "Registrasi berhasil",
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "SET_SHOW_ALERT",
          payload: {
            type: "failed",
            show: true,
            message: error.message,
          },
        });
      });

    dispatch({
      type: "SET_LOADING",
      payload: false,
    });
  };

  return {
    login,
    register,
  };
};

export default AuthHelper;
