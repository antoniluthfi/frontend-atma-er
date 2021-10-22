import React from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Heading, HStack, Text, View } from "native-base";
import { useSelector } from "react-redux";

const DrawerContent = ({ progress, ...props }) => {
  const user = useSelector((state) => state.user.data);

  return (
    <DrawerContentScrollView {...props}>
      <Heading style={{ backgroundColor: "tomato" }}>
        <HStack space={2}>
          <View>
            <Ionicons name="person-circle" size={70} color="white" />
          </View>
          <View justifyContent="center">
            <Text style={{ fontWeight: "bold", color: "white" }}>
              {user.name}
            </Text>
            <Text style={{ fontSize: 13, color: "white" }}>{user.email}</Text>
          </View>
        </HStack>
      </Heading>
      <DrawerItem
        label="Home"
        icon={({ color, size }) => (
          <Ionicons name="home" size={size} color={color} />
        )}
        onPress={() => {
          props.navigation.navigate("Home");
        }}
      />
      <DrawerItem
        label="Profilku"
        icon={({ color, size }) => (
          <Ionicons name="people" size={size} color={color} />
        )}
        onPress={() => {
          props.navigation.navigate("Profilku");
        }}
      />
      <DrawerItem
        label="Rate us"
        icon={({ color, size }) => (
          <Ionicons name="star" size={size} color={color} />
        )}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
});

export default DrawerContent;
