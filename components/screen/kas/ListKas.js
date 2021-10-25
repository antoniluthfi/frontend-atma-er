import React, { useCallback } from "react";
import {
  NativeBaseProvider,
  Box,
  Text,
  Pressable,
  HStack,
  // Avatar,
  View,
  Input,
  Avatar,
  VStack,
} from "native-base";
import { Alert, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/core";
import { SwipeListView } from "react-native-swipe-list-view";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import moment from "moment";
import KasHelper from "./KasHelper";
import Header from "../../reusable/Header";
import NumberFormat from "react-number-format";
import FloatingButton from "../../reusable/FloatingButton";
import { Portal, Provider } from "react-native-paper";
import Loading from "../../reusable/Loading";
import GroupList from "../../reusable/GroupList";

const ListKas = ({ navigation }) => {
  const {
    dataEvent,
    setDataEvent,
    loadDataEvent,
    setLoadDataEvent,
    keyword,
    setKeyword,
    rincianEvent,
    setRincianEvent,
    detailKas,
    setDetailKas,
    getDetailKas,
    getListKas,
    filterKas,
  } = KasHelper(navigation);

  const buatPdf = async () => {
    const options = {
      html: `
        <div style="text-align: center;"><h3>Arus Kas Usman Sidomulyo</h3></div>
        <h5 style="padding: 0; margin: 0;">Total Pemasukan : Rp. ${
          rincianEvent.pemasukan
        }</h5>
        <h5 style="padding: 0; margin: 0;">Total Pemasukan : Rp. ${
          rincianEvent.pengeluaran
        }</h5>
        <table style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr style="background-color: #04aa6d; color: white;">
              <th style="border: 1px solid #ddd; padding: 8px;">#</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Nama</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Event</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Kas</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Nominal</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Keterangan</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Waktu</th>
            </tr>
          </thead>
          <tbody>
          ${detailKas.map(
            (kas, i) => `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">${i + 1}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${
                kas.users.name
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${
                kas.event_kas.nama
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${
                parseInt(kas.jenis) ? "Masuk" : "Keluar"
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">Rp. ${
                kas.nominal
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${
                kas.keterangan ? kas.keterangan : "Tanpa keterangan"
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${moment(
                kas.created_at
              ).format("dddd, Do MMM YYYY h:mm:ss a")}</td>  
            </tr>
          `
          )}
          </tbody>
        </table>
      `,
      fileName: `Arus Kas Usman Sidomulyo_${Date.now()}`,
      directory: "Download",
    };

    const file = await RNHTMLtoPDF.convert(options);

    Alert.alert(
      "Berhasil",
      `Berhasil download file, file tersimpan di ${file.filePath}`,
      [{ text: "Oke deh", style: "cancel" }],
      { cancelable: true }
    );
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await getListKas();
        await getDetailKas(0);
      };

      fetchData();

      return () => {
        setDataEvent([]);
        setLoadDataEvent(true);
        setDetailKas([]);
        setRincianEvent({
          pemasukan: 0,
          pengeluaran: 0,
          total: 0,
        });
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
          setDetailKas([]);
          setRincianEvent({
            pemasukan: 0,
            pengeluaran: 0,
            total: 0,
          });

          await getListKas();
          await getDetailKas(0);
        }}
      />

      <GroupList />

      {loadDataEvent ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <Provider>
            <Portal>
              <View style={styles.wrapper}>
                <View style={[styles.card, styles.items]}>
                  <View style={{ marginLeft: 10 }}>
                    <FontAwesome5 name="money-check" size={60} />
                  </View>
                  <View style={{ marginLeft: 15 }}>
                    <Text style={{ fontWeight: "bold" }}>
                      Total Pemasukan :{" "}
                      <NumberFormat
                        value={rincianEvent.pemasukan}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rp. "}
                        renderText={(value, props) => (
                          <Text style={{ fontWeight: "bold", color: "blue" }}>
                            {value}
                          </Text>
                        )}
                      />
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      Total Pengeluaran :{" "}
                      <NumberFormat
                        value={rincianEvent.pengeluaran}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rp. "}
                        renderText={(value, props) => (
                          <Text style={{ fontWeight: "bold", color: "red" }}>
                            {value}
                          </Text>
                        )}
                      />
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>
                      Total Kas :{" "}
                      <NumberFormat
                        value={rincianEvent.total}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rp. "}
                        renderText={(value, props) => (
                          <Text style={{ fontWeight: "bold", color: "green" }}>
                            {value}
                          </Text>
                        )}
                      />
                    </Text>
                    <Text>{moment().format("dddd, Do MMMM YYYY")}</Text>
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
                <View
                  style={{ marginVertical: 15, paddingLeft: 15, width: "97%" }}
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
                      filterKas(text);
                    }}
                  />
                </View>
              </View>

              <Basic navigation={navigation} dataEvent={dataEvent} />

              <FloatingButton
                navigation={navigation}
                actions={[
                  {
                    icon: "download",
                    label: "Unduh PDF",
                    onPress: buatPdf,
                    small: false,
                  },
                ]}
              />
            </Portal>
          </Provider>
        </View>
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
            <Avatar color="white" bg={"warning.500"}>
              <Ionicons name="card" size={30} color="white" />
            </Avatar>
            <VStack>
              <Text>{item.nama}</Text>
              <Text>
                <NumberFormat
                  value={item.total_kas}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Rp. "}
                  renderText={(value, props) => (
                    <Text style={{ fontSize: 13, color: "gray" }}>{value}</Text>
                  )}
                />
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
