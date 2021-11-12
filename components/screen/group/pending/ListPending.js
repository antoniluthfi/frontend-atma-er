import React, { useCallback } from "react";
import { RefreshControl, StyleSheet } from "react-native";
import {
  Avatar,
  Box,
  HStack,
  Input,
  NativeBaseProvider,
  Pressable,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";
import { useFocusEffect } from "@react-navigation/core";
import { SwipeListView } from "react-native-swipe-list-view";
import moment from "moment";
import { useFonts, Raleway_400Regular } from "@expo-google-fonts/raleway";
import LottieView from "lottie-react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

// component
import Header from "../../../reusable/Header";
import Alert from "../../../reusable/Alert";
import PendingHelper from "./PendingHelper";
import Loading from "../../../reusable/Loading";

const ListKas = ({ navigation }) => {
  const alert = useSelector((state) => state.alert);
  const {
    loading,
    setLoading,
    refresh,
    setRefresh,
    listPending,
    setListPending,
    keyword,
    setKeyword,
    getListPending,
    filterData,
    accGrup,
    rejectGrup,
  } = PendingHelper(navigation);

  const [fontsLoaded, error] = useFonts({
    Raleway_400Regular,
  });

  const onRefresh = useCallback(() => {
    getListPending("all", "refresh");

    return () => {
      setRefresh(true);
      setListPending([]);
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      getListPending("all", "loading");

      return () => {
        setLoading(true);
        setListPending([]);
      };
    }, [])
  );

  return (
    <NativeBaseProvider>
      <Header
        title="List Pending"
        navigation={navigation}
        refresh={true}
        _refresh={async () => {}}
      />

      {alert.show && <Alert />}

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
        <View style={styles.wrapper}>
          <View style={[styles.card, styles.items]}>
            <View style={{ marginLeft: 10 }}>
              <Avatar
                size="lg"
                style={{
                  backgroundColor: "tomato",
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    color: "white",
                  }}
                >
                  {listPending.total}
                </Text>
              </Avatar>
            </View>
            <View style={{ marginLeft: 15 }}>
              <Text
                style={{
                  fontFamily: "Raleway_500Medium",
                  fontSize: 20,
                }}
              >
                Menunggu persetujuan
              </Text>
              <Text
                style={{
                  fontFamily: "Raleway_400Regular",
                }}
              >
                {moment().format("dddd, Do MMMM YYYY")}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
            backgroundColor: "#fff",
            marginTop: 20,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            // elevation: 5,
          }}
        >
          <View style={{ marginVertical: 15, paddingLeft: 15, width: "97%" }}>
            <Input
              type="text"
              placeholder="Cari data disini ..."
              InputRightElement={
                <Ionicons name="search" size={30} style={{ marginRight: 10 }} />
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

        {loading ? (
          <Loading />
        ) : (
          <Basic
            navigation={navigation}
            list={listPending.data}
            accGrup={accGrup}
            rejectGrup={rejectGrup}
          />
        )}
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default ListKas;

const Basic = ({ navigation, list, accGrup, rejectGrup }) => {
  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = ({ item, index }) => (
    <Box>
      <Pressable
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
              <Ionicons name="person-add" size={30} color="white" />
            </Avatar>
            <VStack>
              <Text>{item.user.name}</Text>
              <Text style={{ fontSize: 13, color: "gray" }}>
                {item.group.nama}
              </Text>
              <Text style={{ fontSize: 13, color: "gray" }}>
                {moment(item.created_at, "YYYYMMDDHms").fromNow()}
              </Text>
            </VStack>
          </HStack>
        </HStack>
      </Pressable>
    </Box>
  );

  const renderHiddenItem = (data, rowMap) => (
    <HStack flex={1} pl={1}>
      <Pressable
        px={4}
        ml="auto"
        bg="danger.500"
        justifyContent="center"
        onPress={() => {
          const values = {
            group_id: data.item.group_id,
            user_id: data.item.user_id,
          };

          rejectGrup(values);
        }}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <Ionicons name="close" size={30} color="#fff" />
      </Pressable>
      <Pressable
        px={4}
        bg="info.500"
        justifyContent="center"
        onPress={() => {
          const values = {
            group_id: data.item.group_id,
            user_id: data.item.user_id,
            hak_akses: "anggota",
            status: "terdaftar",
          };

          accGrup(values);
        }}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <Ionicons name="checkmark" size={30} color="#fff" />
      </Pressable>
    </HStack>
  );

  return (
    <Box bg="white" safeArea flex={1}>
      {list.length > 0 ? (
        <SwipeListView
          data={list}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-130}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={1000}
          onRowDidOpen={onRowDidOpen}
        />
      ) : (
        <ScrollView>
          <LottieView
            source={require("../../../../assets/data-not-found.json")}
            style={{
              marginBottom: 50,
              width: "100%",
              height: 400,
            }}
            autoPlay
            loop
          />
        </ScrollView>
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
    // elevation: 5,
  },
});
