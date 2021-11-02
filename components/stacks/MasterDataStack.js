import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import Loading from "../reusable/Loading";

// import stack
import routes from "../../routes";

const Stack = createNativeStackNavigator();

const MasterDataStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarVisible: false,
      }}
    >
      {routes.length > 0 ? (
        routes.map((item, i) => (
          <Stack.Screen
            key={i.toString()}
            name={item.name}
            component={item.component}
          />
        ))
      ) : (
        <Stack.Screen name="LoadingStack" component={Loading} />
      )}
    </Stack.Navigator>
  );
};

export default MasterDataStack;
