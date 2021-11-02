import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

// navigator 
import MainDrawerNavigator from "./MainDrawerNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";

// stack
import AuthStack from "../stacks/AuthStack";
import GroupStack from "../stacks/GroupStack";
import KasStack from "../stacks/KasStack";
import KehadiranStack from "../stacks/KehadiranStack";
import MasterDataStack from "../stacks/MasterDataStack";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  const user = useSelector((state) => state.user.data);

  const validateUser = user ? true : false;

  const tidakPunyaGrup = user && user.user_group && user.user_group.length < 1;
  const grupBlmAccJoin =
    user &&
    user.user_group.length > 0 &&
    user.user_group[0].status === "pending";

  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      {validateUser && !tidakPunyaGrup && !grupBlmAccJoin ? (
        <>
          <Stack.Screen
            name="MainDrawerNavigator"
            component={MainDrawerNavigator}
          />
        </>
      ) : tidakPunyaGrup || grupBlmAccJoin ? (
        <Stack.Screen
          name="ProfileStackNavigator"
          component={
            <ProfileStackNavigator
              validateUser={validateUser}
              grupBlmAccJoin={grupBlmAccJoin}
              tidakPunyaGrup={tidakPunyaGrup}
            />
          }
        />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
