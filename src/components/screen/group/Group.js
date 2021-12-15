import React, { useCallback } from "react";
import {
  NativeBaseProvider,
  View,
  Input,
  Box,
  Pressable,
  HStack,
  Avatar,
  VStack,
  Text,
  Image,
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { Portal, Provider } from "react-native-paper";
import { Linking, StyleSheet, RefreshControl, ScrollView } from "react-native";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/core";
import Ionicons from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import { useFonts, Raleway_400Regular } from "@expo-google-fonts/raleway";
import { PUBLIC_URL } from "@config";

// component
import Header from "../../reusable/Header";
import Loading from "../../reusable/Loading";
import FloatingButton from "../../reusable/FloatingButton";
import GroupHelper from "./GroupHelper";
import FastImage from "react-native-fast-image";

const Group = ({ navigation }) => {
  const {
    user,
    loading,
    setLoading,
    refresh,
    setRefresh,
    dataGroup,
    setDataGroup,
    keyword,
    setKeyword,
    input,
    setInput,
    getDataGroup,
    filterData,
  } = GroupHelper();

  const [fontsLoaded, error] = useFonts({
    Raleway_400Regular,
  });

  const onRefresh = useCallback(() => {
    getDataGroup("refresh");

    return () => {
      setDataGroup([]);
      setRefresh(false);
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      getDataGroup("loading");

      return () => {
        setDataGroup([]);
        setLoading(true);
      };
    }, [])
  );

  return (
    <NativeBaseProvider>
      <Header title="List Grup" navigation={navigation} />

      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={onRefresh}
            colors={["crimson", "coral"]}
          />
        }
      >
        <Provider>
          <Portal>
            <View
              style={{
                flexWrap: "wrap",
                flexDirection: "row",
                backgroundColor: "#fff",
              }}
            >
              <View
                style={{ marginVertical: 15, paddingLeft: 15, width: "97%" }}
              >
                <Input
                  type="text"
                  placeholder="Cari grup disini ..."
                  InputRightElement={
                    <Ionicons
                      name="search"
                      size={30}
                      style={{ marginRight: 10 }}
                    />
                  }
                  value={keyword}
                  onChangeText={(text) => {
                    setKeyword(text);
                    filterData(text);
                  }}
                  style={{
                    fontFamily: "Raleway_400Regular",
                  }}
                />
              </View>
            </View>

            {loading || !fontsLoaded ? (
              <Loading />
            ) : (
              <Basic
                navigation={navigation}
                dataGroup={dataGroup}
                user={user}
              />
            )}

            {user.data.hak_akses === "administrator" && (
              <FloatingButton
                navigation={navigation}
                actions={[
                  {
                    icon: "plus",
                    label: "Buat baru",
                    onPress: () => {
                      navigation.navigate("FormGroup", {
                        judul: "Buat Grup Baru",
                        method: "post",
                        payload: null,
                      });
                    },
                    small: false,
                  },
                  {
                    icon: ({ color, direction, size }) => (
                      <Ionicons name="person-add" color={color} size={size} />
                    ),
                    label: "List pending",
                    onPress: () => {
                      navigation.navigate("ListPending");
                    },
                    small: false,
                  },
                ]}
              />
            )}
          </Portal>
        </Provider>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Group;

const Basic = ({ navigation, dataGroup, user }) => {
  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = ({ item, index }) => (
    <Box>
      <Pressable
        style={{ elevation: -100 }}
        onPress={() => console.log("You touched me")}
        alignItems="center"
        bg="white"
        borderBottomColor="trueGray.200"
        borderBottomWidth={1}
        justifyContent="center"
        height={50}
        underlayColor={"#AAA"}
        _pressed={{
          bg: "trueGray.200",
        }}
        py={8}
      >
        <HStack width="100%" px={4}>
          <HStack space={2} alignItems="center">
            {!item.foto_profil ? (
              <Avatar color="white" bg={"warning.500"}>
                <Ionicons name="people" size={30} color="white" />
              </Avatar>
            ) : (
              <FastImage
                style={{ width: 50, height: 50, borderRadius: 100 }}
                source={{
                  uri: `${PUBLIC_URL}/${item.foto_profil}`,
                  priority: FastImage.priority.normal,
                  cache: FastImage.cacheControl.immutable,
                }}
                resizeMode={FastImage.resizeMode.contain}
                alt="Foto Profil"
              />
            )}
            <VStack>
              <Text
                style={{
                  fontFamily: "Raleway_400Regular",
                }}
              >
                {item.nama}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "grey",
                  fontFamily: "Raleway_400Regular",
                }}
              >
                {item.jumlah_anggota} Anggota
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "grey",
                  fontFamily: "Raleway_400Regular",
                }}
              >
                Dibuat pada{" "}
                {moment(item.created_at).format("dddd, Do MMMM YYYY")}
              </Text>
            </VStack>
          </HStack>
        </HStack>
      </Pressable>
    </Box>
  );

  const renderHiddenItem = (data, rowMap) => (
    <HStack flex={1} pl={2}>
      {data.item.status_daftar === "tidak terdaftar" && (
        <Pressable
          px={4}
          ml="auto"
          bg="danger.500"
          justifyContent="center"
          onPress={() => {}}
          _pressed={{
            opacity: 0.5,
          }}
        >
          <Ionicons name="enter" size={30} color="#fff" />
        </Pressable>
      )}

      {data.item.status_daftar === "pending" && (
        <Pressable
          px={4}
          ml="auto"
          bg="success.500"
          justifyContent="center"
          onPress={() => {
            Linking.openURL(
              `whatsapp://send?text=assalamualaikum&phone=${data.item.nomorhp}`
            );
          }}
          _pressed={{
            opacity: 0.5,
          }}
        >
          <Ionicons name="logo-whatsapp" size={30} color="#fff" />
        </Pressable>
      )}

      {data.item.status_daftar === "terdaftar" && (
        <Pressable
          px={4}
          ml="auto"
          bg="info.500"
          justifyContent="center"
          onPress={() => {
            navigation.navigate("DetailGroup", {
              group_id: data.item.id,
              nama: data.item.nama,
            });
          }}
          _pressed={{
            opacity: 0.5,
          }}
        >
          <Ionicons name="eye" size={30} color="#fff" />
        </Pressable>
      )}

      {user.data.hak_akses === "administrator" && (
        <Pressable
          px={4}
          bg="success.500"
          justifyContent="center"
          onPress={() => {
            navigation.navigate("FormGroup", {
              judul: data.item.nama,
              method: "put",
              payload: data.item,
            });
          }}
          _pressed={{
            opacity: 0.5,
          }}
        >
          <Ionicons name="pencil" size={30} color="#fff" />
        </Pressable>
      )}
    </HStack>
  );

  return (
    <Box bg="white" safeArea flex={1}>
      {dataGroup.length > 0 ? (
        <SwipeListView
          data={dataGroup}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={user.data.hak_akses === "administrator" ? -130 : -65}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={1000}
          onRowDidOpen={onRowDidOpen}
        />
      ) : (
        <LottieView
          source={require("@assets/data-not-found.json")}
          style={{
            position: "absolute",
            top: -100,
            zIndex: -100,
          }}
          autoPlay
          loop
        />
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    width: "95%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 25,
    paddingHorizontal: 10,
    borderRadius: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    shadowColor: "#7f5df0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
