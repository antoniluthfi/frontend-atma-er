import React from "react";
import { TouchableOpacity } from "react-native";
import { Heading, View } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";

const Header = ({ title, navigation }) => {
  return (
    <View style={{ backgroundColor: "tomato", flexDirection: "row" }}>
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ paddingTop: 9, paddingHorizontal: 10 }}>
        <Ionicons name="menu" size={40} color="#fff" />
      </TouchableOpacity>
      <View>
        <Heading m="2" color="white">
          {title}
        </Heading>
      </View>
    </View>
  );
};

export default Header;
