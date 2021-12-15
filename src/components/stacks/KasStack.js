import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListKas from "../screen/kas/ListKas";
import DetailKas from "../screen/kas/DetailKas";
import DetailPerBulan from "../screen/kas/DetailPerBulan";
import HistoryKasPerAnggota from "../screen/kas/HistoryKasPerAnggota";
import DetailHistory from "../screen/kas/DetailHistory";
import FormPenyetoran from "../screen/kas/FormPenyetoran";
import FormPengeluaran from "../screen/kas/FormPengeluaran";
import HistoryKasKeseluruhan from "../screen/kas/HistoryKasKeseluruhan";

const Stack = createNativeStackNavigator();

const KasStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ListKas" component={ListKas} />
      <Stack.Screen name="DetailKas" component={DetailKas} />
      <Stack.Screen name="DetailPerBulan" component={DetailPerBulan} />
      <Stack.Screen name="FormPenyetoran" component={FormPenyetoran} />
      <Stack.Screen name="FormPengeluaran" component={FormPengeluaran} />
      <Stack.Screen
        name="HistoryKasPerAnggota"
        component={HistoryKasPerAnggota}
      />
      <Stack.Screen name="DetailHistory" component={DetailHistory} />
      <Stack.Screen
        name="HistoryKasKeseluruhan"
        component={HistoryKasKeseluruhan}
      />
    </Stack.Navigator>
  );
};

export default KasStack;
