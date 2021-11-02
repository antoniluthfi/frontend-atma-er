import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./DrawerContent";

// screen
import Home from "../screen/Home";
import Profilku from "../screen/user/Profilku";
import KehadiranStack from "../stacks/KehadiranStack";
import KasStack from "../stacks/KasStack";
import GroupStack from "../stacks/GroupStack";
import MasterDataStack from "../stacks/MasterDataStack";

const Drawer = createDrawerNavigator();

const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
      useLegacyImplementation={true}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profilku" component={Profilku} />
      <Drawer.Screen name="GroupStack" component={GroupStack} />
      <Drawer.Screen name="KasStack" component={KasStack} />
      <Drawer.Screen name="KehadiranStack" component={KehadiranStack} />
      <Drawer.Screen name="MasterDataStack" component={MasterDataStack} />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;
