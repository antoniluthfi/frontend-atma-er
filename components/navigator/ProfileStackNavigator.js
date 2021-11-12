import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DataDiri from "../screen/kelengkapan-profil/data-diri/DataDiri";
import Group from "../screen/kelengkapan-profil/group/Group";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = ({ tidakPunyaGrup, grupBlmAccJoin }) => {
  const user = useSelector((state) => state.user.data);

  const validateUser = () => {
    const data = {
      name: user.name,
      email: user.email,
      alamat: user.alamat,
      nomorhp: user.nomorhp,
      nama_ayah: user.nama_ayah,
      nama_ibu: user.nama_ibu,
      tempat_lahir: user.tempat_lahir,
      tgl_lahir: user.tgl_lahir,
      jenis_kelamin: user.jenis_kelamin,
    };

    for (let key in data) {
      if (!data[key]) {
        return false;
      }
    }

    return true;
  };

  return (
    <Stack.Navigator
      initialRouteName={
        !validateUser()
          ? "DataDiri"
          : tidakPunyaGrup || grupBlmAccJoin
          ? "Group"
          : ""
      }
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name="DataDiri" component={DataDiri} />
      <Stack.Screen name="Group" component={Group} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
