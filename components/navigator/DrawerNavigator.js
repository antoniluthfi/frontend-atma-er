import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./DrawerContent";
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="TabNavigator" component={TabNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
