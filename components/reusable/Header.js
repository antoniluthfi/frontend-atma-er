import React from "react";
import { TouchableOpacity } from "react-native";
import { Heading, HStack, IconButton, View } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";

const Header = ({
  title,
  navigation,
  refresh = false,
  _refresh = null,
  menu = true,
}) => {
  return (
    <View style={{ backgroundColor: "tomato", flexDirection: "row" }}>
      {menu && (
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{ paddingTop: 9, paddingLeft: 10 }}
        >
          <Ionicons name="menu" size={40} color="#fff" />
        </TouchableOpacity>
      )}
      <View style={{ width: "100%" }}>
        <HStack space={2}>
          <View style={{ width: "83%" }}>
            <Heading mt="2" mb="2" ml={!menu ? "4" : ""} color="white">
              {title}
            </Heading>
          </View>
          <View style={{ width: "12%", justifyContent: "center" }}>
            {refresh && _refresh && (
              <IconButton
                icon={<Ionicons name="refresh" size={30} color="white" />}
                _pressed={{
                  bg: "warning.600",
                }}
                onPress={() => {
                  _refresh();
                }}
              />
            )}
          </View>
        </HStack>
      </View>
    </View>
  );
};

export default Header;
