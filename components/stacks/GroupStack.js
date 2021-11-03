import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screen
import Group from "../screen/group/Group";
import DetailGroup from "../screen/group/detail-group/DetailGroup";
import DetailPeserta from "../screen/group/detail-group/DetailPeserta";
import FormPeserta from "../screen/group/detail-group/FormPeserta";

const Stack = createNativeStackNavigator();

const GroupStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Group" component={Group} />
      <Stack.Screen name="DetailGroup" component={DetailGroup} />
      <Stack.Screen name="DetailPeserta" component={DetailPeserta} />
      <Stack.Screen name="FormPeserta" component={FormPeserta} />
    </Stack.Navigator>
  );
};

export default GroupStack;
