import React, { useCallback } from "react";
import {
  NativeBaseProvider,
  Box,
  Text,
  Pressable,
  HStack,
  // Avatar,
  Fab,
  Icon,
  Spinner,
  Center,
  Heading,
  View,
} from "native-base";
import { useFocusEffect } from "@react-navigation/core";
import { SwipeListView } from "react-native-swipe-list-view";
import Ionicons from "react-native-vector-icons/Ionicons";
import KasHelper from "./KasHelper";
import Header from "../../reusable/Header";

const ListKas = ({ navigation }) => {
  const {
    dataEvent,
    setDataEvent,
    loadDataEvent,
    setLoadDataEvent,
    getListKas,
  } = KasHelper(navigation);

  useFocusEffect(
    useCallback(() => {
      getListKas();

      return () => {
        setDataEvent([]);
        setLoadDataEvent(true);
      };
    }, [])
  );

  return (
    <NativeBaseProvider>
      <Header title="Event Kas" navigation={navigation} />

      {!loadDataEvent ? (
        <>
          <Box textAlign="center" bg="white" flex={1} safeAreaTop>
            <Basic navigation={navigation} dataEvent={dataEvent} />
          </Box>
          {/* <Fab
            position="absolute"
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
          /> */}
        </>
      ) : (
        <Center flex={1}>
          <Spinner size="lg" color="warning.500" />
          <Text>Tunggu yaa ...</Text>
        </Center>
      )}
    </NativeBaseProvider>
  );
};

export default ListKas;

const Basic = ({ navigation, dataEvent }) => {
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
            <Text>{item.nama}</Text>
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
        onPress={() => {
          navigation.navigate("DetailKas", {
            title: data.item.nama,
            id: data.item.id,
          });
        }}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <Ionicons name="eye" size={30} color="#fff" />
      </Pressable>
    </HStack>
  );

  return (
    <Box bg="white" safeArea flex={1}>
      <SwipeListView
        data={dataEvent}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-65}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={1000}
        onRowDidOpen={onRowDidOpen}
      />
    </Box>
  );
};
