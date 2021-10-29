import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, Animated, Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

import Home from "../screen/Home";
import KehadiranStack from "../stacks/KehadiranStack";
import MasterDataStack from "../stacks/MasterDataStack";
import KasStack from "../stacks/KasStack";
import GroupStack from "../stacks/GroupStack";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const tabBar = useSelector((state) => state.tabBar);
  const [indicatorWidth, setIndicatorWidth] = useState(200);
  const tabOffsetValue = useRef(new Animated.Value(145)).current;

  const getWidth = () => {
    let width = Dimensions.get("window").width;
    width = width - indicatorWidth;
    return width / 5;
  };

  const styles = StyleSheet.create({
    tabBar: {
      position: "absolute",
      bottom: tabBar.barBottom,
      left: 20,
      right: 20,
      elevation: 0,
      backgroundColor: "#fff",
      borderRadius: 10,
      height: 60,
      paddingBottom: 15,
      paddingHorizontal: 8,
      shadowColor: "#000",
      shadowOpacity: 0.06,
      shadowOffset: {
        width: 10,
        height: 10,
      },
    },
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

  return (
    <>
      <Tab.Navigator
        initialRouteName="Beranda"
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          headerShown: false,
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          tabBarStyle: [styles.tabBar, styles.shadow],
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Beranda") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Kehadiran") {
              iconName = focused ? "document-text" : "document-text-outline";
            } else if (route.name === "Data") {
              iconName = focused ? "server" : "server-outline";
            } else if (route.name === "Kas") {
              iconName = focused ? "wallet" : "wallet-outline";
            } else if (route.name === "Grup") {
              iconName = focused ? "people" : "people-outline";
            }
            // You can return any component that you like here!
            return route.name !== "Beranda" ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                }}
              >
                <Ionicons name={iconName} size={20} color={color} />
                <Text style={{ color: color, fontSize: 12 }}>{route.name}</Text>
              </View>
            ) : (
              <View
                style={{
                  width: 55,
                  height: 55,
                  backgroundColor: "tomato",
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 30,
                }}
              >
                <Ionicons name={iconName} size={25} color="white" />
              </View>
            );
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          tabBarHideOnKeyboard: true,
        })}
        screenListeners={({ navigation, route }) => ({
          tabPress: (e) => {
            let value = 145;
            if (route.name === "Kehadiran") {
              value = 0;
              setIndicatorWidth(90);
            } else if (route.name === "Kas") {
              value = 68;
              setIndicatorWidth(110);
            } else if (route.name === "Grup") {
              value = 205;
              setIndicatorWidth(110);
            } else if (route.name === "Data") {
              value = 269;
              setIndicatorWidth(80);
            } else if (route.name === "Beranda") {
              value = 145;
              setIndicatorWidth(200);
            }

            Animated.spring(tabOffsetValue, {
              toValue: value,
              useNativeDriver: true,
            }).start();
          },
        })}
      >
        <Tab.Screen name="Kehadiran" component={KehadiranStack} />
        <Tab.Screen name="Kas" component={KasStack} />
        <Tab.Screen name="Beranda" component={Home} />
        <Tab.Screen name="Grup" component={GroupStack} />
        <Tab.Screen name="Data" component={MasterDataStack} />
      </Tab.Navigator>

      <Animated.View
        style={{
          width: getWidth(),
          height: 4,
          backgroundColor: "tomato",
          position: "absolute",
          bottom: tabBar.indicatorBottom,
          left: 30,
          borderRadius: 50,
          transform: [{ translateX: tabOffsetValue }],
        }}
      ></Animated.View>
    </>
  );
};

export default TabNavigator;
