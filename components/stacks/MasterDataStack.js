import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MasterData from "../screen/master-data/MasterData";

// kas
import EventKas from "../screen/master-data/kas/EventKas";
import FormEventKas from "../screen/master-data/kas/FormEventKas";

// data usman
import DataUsman from "../screen/master-data/data-usman/DataUsman";
import FormUsman from "../screen/master-data/data-usman/FormUsman";
import DetailUsman from '../screen/master-data/data-usman/DetailUsman';

const Stack = createNativeStackNavigator();

const MasterDataStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MasterDataList" component={MasterData} />
      <Stack.Screen name="EventKas" component={EventKas} />
      <Stack.Screen name="FormEventKas" component={FormEventKas} />
      <Stack.Screen name="DataUsman" component={DataUsman} />
      <Stack.Screen name="FormUsman" component={FormUsman} />
      <Stack.Screen name="DetailUsman" component={DetailUsman} />
    </Stack.Navigator>
  );
};

export default MasterDataStack;
