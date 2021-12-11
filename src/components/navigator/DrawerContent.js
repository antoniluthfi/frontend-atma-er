import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Heading, HStack, Text, View, Image } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { TEST_URL, PUBLIC_URL } from "@config";

const DrawerContent = ({ ...props }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logout = async () => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });

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
          type: "LOGIN",
          payload: {
            data: null,
            token: null,
          },
        });

        dispatch({
          type: "SET_SHOW_ALERT",
          payload: {
            type: "success",
            show: true,
            message: "Logout berhasil",
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: "SET_SHOW_ALERT",
          payload: {
            type: "failed",
            show: true,
            message: "Logout gagal, silahkan coba lagi!",
          },
        });
      });

    dispatch({
      type: "SET_LOADING",
      payload: false,
    });
  };

  return (
    <DrawerContentScrollView {...props}>
      <Heading style={{ backgroundColor: "tomato" }}>
        <HStack space={2}>
          <View>
            {user.data.foto_profil ? (
              <Image
                size={70}
                resizeMode={"contain"}
                borderRadius={100}
                source={{
                  uri: `${PUBLIC_URL}/${user.data.foto_profil}`,
                }}
                alt="Foto Profil"
              />
            ) : (
              <Ionicons name="person-circle" size={70} color="white" />
            )}
          </View>
          <View justifyContent="center">
            <Text style={{ fontWeight: "bold", color: "white" }}>
              {user.data.name}
            </Text>
            <Text style={{ fontSize: 13, color: "white" }}>
              {user.data.email}
            </Text>
          </View>
        </HStack>
      </Heading>
      <DrawerItem
        label="Home"
        icon={({ color, size }) => (
          <Ionicons name="home" size={size} color={color} />
        )}
        onPress={() => {
          props.navigation.navigate("Home");
        }}
      />

      <DrawerItem
        label="Profilku"
        icon={({ color, size }) => (
          <Ionicons name="people" size={size} color={color} />
        )}
        onPress={() => {
          props.navigation.navigate("UserStack", {
            screen: "Profilku",
            params: {
              foto_profil: user.data.foto_profil || null,
            },
          });
        }}
      />

      <DrawerItem
        label="Kehadiran"
        icon={({ color, size }) => (
          <Ionicons name="bar-chart" size={size} color={color} />
        )}
        onPress={() => {
          props.navigation.navigate("KehadiranStack", {
            screen: "Kehadiran",
          });
        }}
      />

      <DrawerItem
        label="Kas"
        icon={({ color, size }) => (
          <Ionicons name="wallet" size={size} color={color} />
        )}
        onPress={() => {
          props.navigation.navigate("KasStack", { screen: "ListKas" });
        }}
      />

      <DrawerItem
        label="Grup"
        icon={({ color, size }) => (
          <Ionicons name="people" size={size} color={color} />
        )}
        onPress={() => {
          props.navigation.navigate("GroupStack", { screen: "Group" });
        }}
      />

      <DrawerItem
        label="Master Data"
        icon={({ color, size }) => (
          <Ionicons name="server" size={size} color={color} />
        )}
        onPress={() => {
          props.navigation.navigate("MasterDataStack", {
            screen: "MasterData",
          });
        }}
      />

      <DrawerItem
        label="Logout"
        icon={({ color, size }) => (
          <Ionicons name="log-out" size={size} color={color} />
        )}
        onPress={logout}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
});

export default DrawerContent;