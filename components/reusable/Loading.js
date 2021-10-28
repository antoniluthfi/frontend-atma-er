import React from "react";
import { Center, Text } from "native-base";
import LottieView from "lottie-react-native";

const Loading = () => {
  return (
    <Center flex={1} style={{ backgroundColor: "white" }}>
      <LottieView
        source={require("../../assets/loader.json")}
        style={{
          width: 100,
          height: 100,
        }}
        autoPlay
        loop
      />
      <Text>Tunggu yaa ...</Text>
    </Center>
  );
};

export default Loading;
