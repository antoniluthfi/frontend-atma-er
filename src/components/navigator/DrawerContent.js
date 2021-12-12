import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Heading, HStack, Text, View, Image } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { TEST_URL, PUBLIC_URL } from "@config";
import {
  useFonts,
  Raleway_400Regular,
  Raleway_500Medium,
} from "@expo-google-fonts/raleway";
import codePush from "react-native-code-push";

const DrawerContent = ({ ...props }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [version, setVersion] = React.useState(0.1);

  const [fontsLoaded, error] = useFonts({
    Raleway_400Regular,
    Raleway_500Medium,
  });

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

  React.useEffect(() => {
    codePush.getUpdateMetadata().then((metadata) =>{
      setVersion(metadata.appVersion);
    });
  }, []);

  console.log(version);
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContent}
    >
      <Heading
        style={{
          backgroundColor: "tomato",
          height: 80,
          paddingTop: 5,
          paddingLeft: 5,
        }}
      >
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
            <Text style={{ color: "white", fontFamily: "Raleway_500Medium" }}>
              {user.data.name}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "white",
                fontFamily: "Raleway_400Regular",
              }}
            >
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
        labelStyle={{
          fontFamily: "Raleway_400Regular",
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
        labelStyle={{
          fontFamily: "Raleway_400Regular",
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
        labelStyle={{
          fontFamily: "Raleway_400Regular",
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
        labelStyle={{
          fontFamily: "Raleway_400Regular",
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
        labelStyle={{
          fontFamily: "Raleway_400Regular",
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
        labelStyle={{
          fontFamily: "Raleway_400Regular",
        }}
      />
      <DrawerItem
        label="Logout"
        icon={({ color, size }) => (
          <Ionicons name="log-out" size={size} color={color} />
        )}
        onPress={logout}
        labelStyle={{
          fontFamily: "Raleway_400Regular",
        }}
      />

      <View style={styles.footer}>
        <Text
          style={{
            fontFamily: "Raleway_500Medium",
            fontSize: 15,
            color: "white"
          }}
        >
          Atma E-Report
        </Text>
        <Text
          style={{
            fontFamily: "Raleway_400Regular",
            fontSize: 12,
            color: "white"
          }}
        >
          V{version}
        </Text>
      </View>
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
  bottomText: {
    position: "absolute",
    bottom: -10,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 60,
    backgroundColor: "tomato",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DrawerContent;
