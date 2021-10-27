import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Group from "../screen/group/Group";

const Stack = createNativeStackNavigator();

const GroupStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Group" component={Group} />
    </Stack.Navigator>
  );
};

export default GroupStack;
