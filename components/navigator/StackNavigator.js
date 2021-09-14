import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "../stacks/AuthStack";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name="AuthStack" component={AuthStack} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
