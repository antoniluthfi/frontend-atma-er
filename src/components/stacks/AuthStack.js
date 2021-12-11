import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screen/auth/Login";
import Register from "../screen/auth/Register";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      {/* <Stack.Screen
        name="HistoryKasPerAnggota"
        component={HistoryKasPerAnggota}
      /> */}
    </Stack.Navigator>
  );
};

export default AuthStack;
