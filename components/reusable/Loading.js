import React from "react";
import { Center, Text } from "native-base";
import LottieView from "lottie-react-native";
import { useFonts, Raleway_400Regular } from "@expo-google-fonts/raleway";

const Loading = () => {
  const [fontsLoaded, error] = useFonts({
    Raleway_400Regular,
  });

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
      <Text
        style={{
          fontFamily: "Raleway_400Regular",
        }}
      >
        Tunggu yaa ...
      </Text>
    </Center>
  );
};

export default Loading;
