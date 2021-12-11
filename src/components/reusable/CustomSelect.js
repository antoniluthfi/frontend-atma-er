import { StatusBar } from "native-base";
import React from "react";
import { Modal, StyleSheet, View, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";

const height = Dimensions.get("window").height;

const CustomSelect = ({ children }) => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.select.show);

  return (
    <>
      <StatusBar animated backgroundColor={show ? "rgb(74, 29, 22)" : "tomato"} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={() => {
          dispatch({
            type: "SET_SHOW_SELECT",
            payload: {
              show: false,
            },
          });
        }}
      >
        <View style={styles.container}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>{children}</View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalView: {
    marginTop: height - 125,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default CustomSelect;
