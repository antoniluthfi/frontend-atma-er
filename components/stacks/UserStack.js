import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profilku from "../screen/user/Profilku";
import UpdateProfil from "../screen/user/UpdateProfil";

const Stack = createNativeStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profilku" component={Profilku} />
      <Stack.Screen name="UpdateProfil" component={UpdateProfil} />
      {/* <Stack.Screen
        name="HistoryKasPerAnggota"
        component={HistoryKasPerAnggota}
      /> */}
    </Stack.Navigator>
  );
};

export default UserStack;
