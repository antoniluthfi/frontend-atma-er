import { useState } from "react";
import axios from "axios";
import { TEST_URL } from "@env";
import { useSelector, useDispatch } from "react-redux";

const DataDiriHelper = (navigation) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const postDataDiri = async (values) => {
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

        navigation.navigate("Group");
      })
      .catch((err) => {
        alert(err.message);
      });

    dispatch({
      type: "SET_LOADING",
      payload: false,
    });
  };

  return {
    postDataDiri,
  };
};

export default DataDiriHelper;
