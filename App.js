import React from "react";
import { StatusBar, Dimensions } from "react-native";
import { Spinner, View, NativeBaseProvider, Text } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

// navigator
import MainDrawerNavigator from "./components/navigator/MainDrawerNavigator";
import MainStackNavigator from "./components/navigator/MainStackNavigator";
import ProfileStackNavigator from "./components/navigator/ProfileStackNavigator";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const App = () => {
  const loading = useSelector((state) => state.loading);
  const user = useSelector((state) => state.user.data);

  const validateUser = user ? true : false;

  const tidakPunyaGrup = user && user.user_group && user.user_group.length < 1;
  const grupBlmAccJoin =
    user && user.user_group.length > 0 && user.user_group[0].status === "pending";

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <StatusBar
          animated={true}
          backgroundColor={loading ? "rgb(74, 29, 22)" : "tomato"}
          barStyle="default"
          showHideTransition="fade"
          hidden={false}
        />
        {loading && (
          <View
            style={{
              position: "absolute",
              top: -10,
              zIndex: 999,
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              elevation: 3,
              backgroundColor: "rgba(0,0,0, 0.7)",
              width: windowWidth + 100,
              height: windowHeight + 10,
            }}
          >
            <Spinner size="lg" color="warning.500" />
            <Text style={{ fontSize: 20, color: "#fff" }}>Tunggu yaa ...</Text>
          </View>
        )}
        {validateUser && !tidakPunyaGrup && !grupBlmAccJoin ? (
          <MainDrawerNavigator />
        ) : tidakPunyaGrup || grupBlmAccJoin ? (
          <ProfileStackNavigator
            validateUser={validateUser}
            grupBlmAccJoin={grupBlmAccJoin}
            tidakPunyaGrup={tidakPunyaGrup}
          />
        ) : (
          <MainStackNavigator />
        )}
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
