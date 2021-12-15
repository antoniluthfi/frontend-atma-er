import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { TEST_URL } from "@config";
import PushNotification from "react-native-push-notification";

const AuthHelper = (navigation) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const login = async (values) => {
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
      PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: async function (data) {
          dispatch({
            type: "SET_LOADING",
            payload: true,
          });

          await axios({
            method: "post",
            url: `${TEST_URL}/login`,
            data: {
              email: values.email,
              password: values.password,
              fcm_token: data.token,
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
              console.log(statusCode);
              if (statusCode >= 400 && statusCode < 500) {
                message =
                  "Email tidak dapat ter-otorisasi, silahkan login lagi";
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
        },
      });
    }
  };

  const register = async (values) => {
    let alert;

    if (!values.name) alert = "Nama nya masih kosong tuh, isi dulu yaa";
    else if (!values.nomorhp)
      alert = "Nomor hp nya masih kosong tuh, isi dulu yaa";
    else if (!values.email)
      alert = "Nomor hp nya masih kosong tuh, isi dulu yaa";
    else if (!values.password) alert = "Password nya diisi dulu yaa";
    else if (!values.c_password) alert = "Password nya diisi dulu yaa";
    else if (values.password !== values.c_password)
      alert = "Password konfirmasi harus sama";

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
      dispatch({
        type: "SET_LOADING",
        payload: true,
      });

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
              type: "success",
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
    }
  };

  const logout = async () => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    await axios({
      method: "POST",
      url: `${TEST_URL}/logout`,
      data: {},
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(() => {
        dispatch({
          type: "LOGIN",
          payload: {
            data: null,
            token: null,
          },
        });

        dispatch({
          type: "SET_SHOW_ALERT",
          payload: {
            type: "success",
            show: true,
            message: "Logout berhasil",
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: "SET_SHOW_ALERT",
          payload: {
            type: "failed",
            show: true,
            message: "Logout gagal, silahkan coba lagi!",
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
    logout,
  };
};

export default AuthHelper;
