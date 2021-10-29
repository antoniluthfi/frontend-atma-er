import React, { useCallback } from "react";
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/core";
import success from "../../assets/success.json";
import failed from "../../assets/failed.json";

const Alert = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  const toggle = () => {
    if (alert.show) {
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }).start();
    }
  };

  useFocusEffect(
    useCallback(() => {
      toggle();
    }, [])
  );

  return (
    <Modal transparent visible={alert.show}>
      <View style={styles.background}>
        <Animated.View
          style={[styles.container, { transform: [{ scale: scaleValue }] }]}
        >
          <View style={{ alignItems: "center" }}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => {
                  dispatch({
                    type: "SET_SHOW_ALERT",
                    payload: false,
                  });
                }}
              >
                <Ionicons name="close" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ alignItems: "center" }}>
            <LottieView
              source={alert.type === "success" ? success : failed}
              autoPlay
              loop={false}
              style={{
                width: 150,
                height: 150,
              }}
            />
          </View>
          <Text
            style={{ marginVertical: 30, fontSize: 20, textAlign: "center" }}
          >
            {alert.message}
          </Text>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "rgba(0,0,0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "88%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});

export default Alert;
