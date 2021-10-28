import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Kehadiran from "../screen/kehadiran/Kehadiran";
import BuatAbsenBaru from "../screen/kehadiran/BuatAbsenBaru";
import UpdateEventTerakhir from "../screen/kehadiran/UpdateEventTerakhir";

const Stack = createNativeStackNavigator();

const KehadiranStack = ({ navigation, route }) => {


  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DataKehadiran" component={Kehadiran} />
      <Stack.Screen
        name="UpdateEventTerakhir"
        component={UpdateEventTerakhir}
      />
      <Stack.Screen name="BuatAbsenBaru" component={BuatAbsenBaru} />
    </Stack.Navigator>
  );
};

export default KehadiranStack;
