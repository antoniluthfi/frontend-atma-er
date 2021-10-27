import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Home from "../screen/Home";
import KehadiranStack from "../stacks/KehadiranStack";
import MasterDataStack from "../stacks/MasterDataStack";
import KasStack from "../stacks/KasStack";
import GroupStack from "../stacks/GroupStack";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        tabBarStyle: [
          {
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: "#fff",
            borderRadius: 15,
            height: 90,
            paddingBottom: 15,
          },
          styles.shadow,
        ],
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Beranda") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Kehadiran") {
            iconName = focused ? "document-text" : "document-text-outline";
          } else if (route.name === "Master Data") {
            iconName = focused ? "server" : "server-outline";
          } else if (route.name === "Kas") {
            iconName = focused ? "cash" : "cash-outline";
          } else if (route.name === "Grup") {
            iconName = focused ? "people" : "people-outline";
          }
          // You can return any component that you like here!
          return (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Ionicons name={iconName} size={30} color={color} />
              <Text style={{ color: color, fontSize: 12 }}>{route.name}</Text>
            </View>
          );
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarHideOnKeyboard: true
      })}
    >
      <Tab.Screen name="Beranda" component={Home} />
      <Tab.Screen name="Kehadiran" component={KehadiranStack} />
      <Tab.Screen name="Kas" component={KasStack} />
      <Tab.Screen name="Grup" component={GroupStack} />
      <Tab.Screen name="Master Data" component={MasterDataStack} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7f5df0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default TabNavigator;
