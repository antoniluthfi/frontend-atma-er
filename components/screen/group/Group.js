import React, { useCallback, useEffect } from "react";
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
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { Portal, Provider } from "react-native-paper";
import { Linking, StyleSheet } from "react-native";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/core";
import Ionicons from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import { useFonts, Raleway_400Regular } from "@expo-google-fonts/raleway";

// component
import Header from "../../reusable/Header";
import Loading from "../../reusable/Loading";
import FloatingButton from "../../reusable/FloatingButton";
import GroupHelper from "./GroupHelper";
import KeyboardHelper from "../../reusable/KeyboardHelper";

const Group = ({ navigation }) => {
  const {} = KeyboardHelper("Group");
  const {
    user,
    loading,
    setLoading,
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

  useFocusEffect(
    useCallback(() => {
      getDataGroup();

      return () => {
        setDataGroup([]);
        setLoading(true);
      };
    }, [])
  );

  return (
    <NativeBaseProvider>
      <Header
        title="List Grup"
        navigation={navigation}
        refresh={true}
        _refresh={async () => {
          setLoading(true);
          setDataGroup([]);

          await getDataGroup();
        }}
      />
      <View style={styles.container}>
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
                    onPress: () =>
                      navigation.navigate("FormUsman", {
                        payload: null,
                        method: "post",
                        judul: "Form Usman",
                      }),
                    small: false,
                  },
                ]}
              />
            )}
          </Portal>
        </Provider>
      </View>
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
            <Avatar color="white" bg={"warning.500"}>
              <Ionicons name="people" size={30} color="white" />
            </Avatar>
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
    </HStack>
  );

  return (
    <Box bg="white" safeArea flex={1}>
      {dataGroup.length > 0 ? (
        <SwipeListView
          data={dataGroup}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-60}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={1000}
          onRowDidOpen={onRowDidOpen}
        />
      ) : (
        <LottieView
          source={require("../../../assets/data-not-found.json")}
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
