import React from "react";
import { StatusBar, Dimensions } from "react-native";
import { View, NativeBaseProvider, Text } from "native-base";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";

// navigator
import MainStackNavigator from "@components/navigator/MainStackNavigator";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const App = () => {
  const loading = useSelector((state) => state.loading.loading);
  const alert = useSelector((state) => state.alert);

  return (
    <NativeBaseProvider>
      <StatusBar
        animated={true}
        backgroundColor={
          loading
            ? "rgb(74, 29, 22)"
            : alert.show
            ? "rgb(128, 49, 34)"
            : "tomato"
        }
        barStyle="default"
        showHideTransition="fade"
        hidden={false}
      />
      {loading && (
        <View
          style={{
            position: "absolute",
            top: -10,
            zIndex: 999,
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            elevation: 3,
            backgroundColor: "rgba(0,0,0, 0.7)",
            width: windowWidth + 100,
            height: windowHeight + 10,
          }}
        >
          <LottieView
            source={require("./assets/loader.json")}
            style={{
              width: 100,
              height: 100,
            }}
            autoPlay
            loop
          />
          <Text style={{ fontSize: 20, color: "#fff" }}>Tunggu yaa ...</Text>
        </View>
      )}

      <MainStackNavigator />
    </NativeBaseProvider>
  );
};

export default App;
