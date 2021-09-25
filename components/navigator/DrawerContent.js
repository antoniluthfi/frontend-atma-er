import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";
import axios from "axios";
import { TEST_URL } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Center, NativeBaseProvider, VStack } from "native-base";

const DrawerContent = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [currentTab, setCurrentTab] = useState("Home");

  const logout = async () => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    console.log("logout");
    await axios({
      method: "POST",
      url: `${TEST_URL}/logout`,
      data: {},
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(() => {
        dispatch({
          type: "LOGOUT",
          payload: {
            user: null,
            token: null,
          },
        });
      })
      .catch((error) => {
        console.log(error.message);
      });

    dispatch({
      type: "SET_LOADING",
      payload: false,
    });
  };

  const TabButton = (currentTab, setCurrentTab, title, icon, exec = null) => {
    return (
      <TouchableHighlight
        activeOpacity={1}
        underlayColor={currentTab === title ? "white" : "transparent"}
        style={{ borderRadius: 10, marginTop: 5 }}
        onHideUnderlay={() => setCurrentTab("")}
        onShowUnderlay={() => setCurrentTab(title)}
        onPress={() => {
          if (exec) {
            exec();
          }
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 15,
            paddingLeft: 13,
            paddingRight: 75,
            borderRadius: 8,
            borderRadius: 10,
            backgroundColor: currentTab === title ? "white" : "transparent",
          }}
        >
          <MaterialCommunityIcons
            name={icon}
            size={25}
            color={currentTab === title ? "black" : "white"}
          />
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              paddingLeft: 15,
              color: currentTab === title ? "black" : "white",
            }}
          >
            {title}
          </Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <View style={{ justifyContent: "flex-start" }}>
          <View
            style={{
              backgroundColor: "white",
              paddingBottom: 10,
              borderBottomEndRadius: 50,
            }}
          >
            <VStack space={2}>
              <Center>
                <Image
                  source={{
                    uri: "https://pbs.twimg.com/profile_images/1309797238651060226/18cm6VhQ_400x400.jpg",
                  }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    marginTop: 8,
                  }}
                ></Image>
              </Center>

              <Center>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  {user.data && user.data.name}
                </Text>

                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "gray",
                  }}
                >
                  {user.data && user.data.email}
                </Text>
              </Center>
            </VStack>
          </View>

          <View style={{ padding: 15 }}>
            <View style={{ flexGrow: 1 }}>
              {TabButton(currentTab, setCurrentTab, "Profilku", "account", () =>
                navigation.navigate("Profilku")
              )}
              {TabButton(currentTab, setCurrentTab, "Ganti Password", "key")}
              {TabButton(
                currentTab,
                setCurrentTab,
                "Tentang Aplikasi",
                "bookmark"
              )}
            </View>

            <View>
              {TabButton(currentTab, setCurrentTab, "Logout", "logout", () => {
                navigation.closeDrawer();
                logout();
              })}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
    justifyContent: "flex-start",
  },
});
