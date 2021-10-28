import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import Loading from "../reusable/Loading";

// import stack
import administratorStack from "../../routes/master-data-stack/administrator";

const Stack = createNativeStackNavigator();

const MasterDataStack = () => {
  const user = useSelector((state) => state.user);
  const administrator = user && user.data.hak_akses === "administrator";

  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const getRoutes = () => {
      if (administrator) {
        setRoutes(administratorStack);
      }
    };

    getRoutes();

    return () => {
      setRoutes([]);
    };
  }, []);

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
