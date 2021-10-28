import React from "react";
import { useFocusEffect } from "@react-navigation/core";
import {
  NativeBaseProvider,
  Box,
  Text,
  Pressable,
  HStack,
  // Avatar,
  Fab,
  Icon,
  Input,
  Avatar,
  VStack,
} from "native-base";
import { StyleSheet, View } from "react-native";
import { Portal, Provider } from "react-native-paper";
import { SwipeListView } from "react-native-swipe-list-view";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import EventKasHelper from "./EventKasHelper";
import Header from "../../../reusable/Header";
import Loading from "../../../reusable/Loading";
import NumberFormat from "react-number-format";
import GroupList from "../../../reusable/GroupList";
import LottieView from "lottie-react-native";

const EventKas = ({ navigation }) => {
  const {
    dataEvent,
    setDataEvent,
    loadDataEvent,
    setLoadDataEvent,
    keyword,
    setKeyword,
    getEventKas,
    filterData,
  } = EventKasHelper(navigation);

  useFocusEffect(
    React.useCallback(() => {
      getEventKas();

      return () => {
        setDataEvent([]);
        setLoadDataEvent(true);
      };
    }, [])
  );

  return (
    <NativeBaseProvider>
      <Header
        title="Event Kas"
        navigation={navigation}
        refresh={true}
        _refresh={async () => {
          setDataEvent([]);
          setLoadDataEvent(true);
          await getEventKas();
        }}
      />
      <GroupList />
      <View style={styles.container}>
        <Provider>
          <Portal>
            <View
              style={{
                flexWrap: "wrap",
                flexDirection: "row",
                backgroundColor: "#fff",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            >
              <View
                style={{
                  marginVertical: 15,
                  paddingLeft: 15,
                  width: "97%",
                }}
              >
                <Input
                  type="text"
                  placeholder="Cari kas disini ..."
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
                />
              </View>
            </View>

            {loadDataEvent ? (
              <Loading />
            ) : (
              <Basic navigation={navigation} dataEvent={dataEvent.event} />
            )}

            <Fab
              position="absolute"
              style={{
                bottom: 130,
              }}
              size="sm"
              onPress={() =>
                navigation.navigate("FormEventKas", {
                  method: "post",
                  judul: "Buat Event Baru",
                  payload: null,
                })
              }
              icon={
                <Icon color="white" as={<AntDesign name="plus" />} size="sm" />
              }
            />
          </Portal>
        </Provider>
      </View>
    </NativeBaseProvider>
  );
};

export default EventKas;

const Basic = ({ navigation, dataEvent }) => {
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

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
              <Ionicons name="wallet" size={30} color="white" />
            </Avatar>
            <VStack>
              <Text>{item.nama}</Text>
              <NumberFormat
                value={item.total_kas}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp. "}
                renderText={(value, props) => (
                  <Text style={{ fontSize: 12, color: "grey" }}>
                    Total Kas {value}
                  </Text>
                )}
              />
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
        bg="dark.500"
        justifyContent="center"
        onPress={() => closeRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <Ionicons name="close" size={30} color="#fff" />
      </Pressable>
      <Pressable
        px={4}
        bg="red.500"
        justifyContent="center"
        onPress={() =>
          navigation.navigate("FormEventKas", {
            method: "put",
            judul: "Update Event Kas",
            payload: data.item,
          })
        }
        _pressed={{
          opacity: 0.5,
        }}
      >
        <Ionicons name="pencil" size={30} color="#fff" />
      </Pressable>
    </HStack>
  );

  return (
    <Box bg="white" safeArea flex={1}>
      {dataEvent.length > 0 ? (
        <SwipeListView
          data={dataEvent}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-130}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={1000}
          onRowDidOpen={onRowDidOpen}
        />
      ) : (
        <LottieView
          source={require("../../../../assets/data-not-found.json")}
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
});
