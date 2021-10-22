import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { TEST_URL } from "@env";
import { Alert } from "react-native";

const AuthHelper = (navigation) => {
  const dispatch = useDispatch();

  const login = async (values) => {
    let alert;
    if (!values.email) alert = "Email harus diisi!";
    else if (!values.password) alert = "Password harus diisi!";

    if (alert) {
      Alert.alert("Login Gagal", alert, [
        { text: "Oke", style: "cancel", onPress: () => console.log("oke") },
      ]);
    } else {
      dispatch({
        type: "SET_LOADING",
        payload: true,
      });

      console.log("login");
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

          Alert.alert("Login Gagal", message, [
            { text: "Oke", style: "cancel", onPress: () => console.log("oke") },
          ]);
        });

      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    }
  };

  const register = async (values) => {
    console.log("register");
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
        alert("Silahkan cek email untuk bisa mengaktifkan akun!");
      })
      .catch((error) => {
        console.log(error.message);
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
