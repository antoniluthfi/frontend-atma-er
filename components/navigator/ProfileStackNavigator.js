import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DataDiri from "../screen/data-diri/DataDiri";
import Group from "../screen/group/Group";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = ({
  validateUser,
  tidakPunyaGrup,
  grupBlmAccJoin,
}) => {
  const user = useSelector((state) => state.user.data);

  console.log(tidakPunyaGrup, grupBlmAccJoin);
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      {!validateUser && user.user_group && user.user_group.length < 1 && (
        <>
          <Stack.Screen name="DataDiri" component={DataDiri} />
          <Stack.Screen name="Group" component={Group} />
        </>
      )}
      {(tidakPunyaGrup || grupBlmAccJoin) && (
        <Stack.Screen name="Group" component={Group} />
      )}
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
