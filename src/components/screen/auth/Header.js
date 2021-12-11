import React from "react";
import { Box, Center, Heading, Text, View } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  useFonts,
  Raleway_400Regular,
  Raleway_500Medium,
} from "@expo-google-fonts/raleway";

const Header = () => {
  const [fontsLoaded, error] = useFonts({
    Raleway_400Regular,
    Raleway_500Medium,
  });

  return (
    <View style={{ backgroundColor: "tomato", paddingVertical: 25 }}>
      <Box
        alignSelf={{
          base: "center",
          md: "flex-start",
        }}
      >
        <Center>
          <Ionicons name="people-circle" size={100} color="white" />
        </Center>
        <Heading size="2xl" color="white">
          <Text
            style={{
              fontFamily: "Raleway_500Medium",
              fontSize: 30,
              color: "white",
            }}
          >
            Usman Sidomulyo
          </Text>
        </Heading>
      </Box>
    </View>
  );
};

export default Header;
