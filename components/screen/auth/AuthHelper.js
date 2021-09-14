import { useState } from "react";
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
        console.log(error);
      });

    dispatch({
      type: "SET_LOADING",
      payload: false,
    });
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
