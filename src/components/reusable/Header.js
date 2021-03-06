import React from "react";
import { TouchableOpacity } from "react-native";
import { Heading, HStack, IconButton, Text, View } from "native-base";
import { DrawerActions } from "@react-navigation/routers";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFonts, Raleway_400Regular } from "@expo-google-fonts/raleway";
import { useRoute } from "@react-navigation/core";
import { userLogout } from "@stores/actions/authActions";
import { useDispatch } from "react-redux";

const Header = ({ title, navigation, logoutIcon = false, menu = true }) => {
  const dispatch = useDispatch();
  const route = useRoute();
  const [fontsLoaded, error] = useFonts({
    Raleway_400Regular,
  });

  return (
    fontsLoaded && (
      <View style={{ backgroundColor: "tomato", flexDirection: "row" }}>
        {navigation.getState().routes[0].name === route.name && menu && (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            style={{ paddingTop: 9, paddingLeft: 10 }}
          >
            <Ionicons name="menu" size={40} color="#fff" />
          </TouchableOpacity>
        )}

        {navigation.getState().routes[0].name !== route.name && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ paddingTop: 9, paddingLeft: 10 }}
          >
            <Ionicons name="chevron-back" size={40} color="#fff" />
          </TouchableOpacity>
        )}

        <View style={{ width: "100%" }}>
          <HStack space={2}>
            <View style={{ width: menu ? "70%" : "83%" }}>
              <Heading mt="2" mb="2" ml={!menu ? "4" : ""} color="white">
                <Text
                  style={{
                    fontFamily: "Raleway_400Regular",
                    fontSize: 29,
                    color: "white",
                  }}
                >
                  {title}
                </Text>
              </Heading>
            </View>
            <View style={{ width: "12%", justifyContent: "center" }}>
              {logoutIcon && (
                <IconButton
                  icon={<Ionicons name="exit-outline" size={30} color="white" />}
                  _pressed={{
                    bg: "warning.600",
                  }}
                  onPress={() => {
                    dispatch(userLogout());
                  }}
                />
              )}
            </View>
          </HStack>
        </View>
      </View>
    )
  );
};

export default Header;
