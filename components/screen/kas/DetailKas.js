import React, { useCallback } from "react";
import "moment/locale/id";
import moment from "moment";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { useFocusEffect } from "@react-navigation/core";
import {
  NativeBaseProvider,
  Box,
  Text,
  Pressable,
  HStack,
  Avatar,
  VStack,
  Input,
  Menu,
  IconButton,
} from "native-base";
import NumberFormat from "react-number-format";
import { Portal, Provider } from "react-native-paper";
import { SwipeListView } from "react-native-swipe-list-view";
import { useSelector, useDispatch } from "react-redux";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import LottieView from "lottie-react-native";
import {
  useFonts,
  Raleway_400Regular,
  Raleway_500Medium,
} from "@expo-google-fonts/raleway";

// component
import Header from "../../reusable/Header";
import Alert from "../../reusable/Alert";
import FloatingButton from "../../reusable/FloatingButton";
import KasHelper from "./KasHelper";
import Loading from "../../reusable/Loading";

const DetailKas = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  const { title, id, group_id } = route.params;
  const {
    detailKas,
    setDetailKas,
    loadDetailKas,
    setLoadDetailKas,
    refreshDetailKas,
    setRefreshDetailKas,
    dataArusKas,
    setDataArusKas,
    pemasukan,
    setPemasukan,
    pengeluaran,
    setPengeluaran,
    keyword,
    setKeyword,
    getDetailKas,
    getArusKasBulanIni,
    filterUser,
  } = KasHelper();

  const [fontsLoaded, error] = useFonts({
    Raleway_400Regular,
    Raleway_500Medium,
  });

  const buatPdf = async () => {
    const options = {
      html: `
        <div style="text-align: center;"><h3>Arus ${title} Usman Sidomulyo</h3></div>
        <h5 style="padding: 0; margin: 0;">Total Pemasukan : Rp. ${pemasukan}</h5>
        <h5 style="padding: 0; margin: 0;">Total Pemasukan : Rp. ${pengeluaran}</h5>
        <table style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr style="background-color: #04aa6d; color: white;">
              <th style="border: 1px solid #ddd; padding: 8px;">#</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Nama</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Kas</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Nominal</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Keterangan</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Waktu</th>
            </tr>
          </thead>
          <tbody>
            ${dataArusKas.map(
              (kas, i) => `
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${i + 1}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${
                  kas.users.name
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
      fileName: `Arus ${title} Usman Sidomulyo_${Date.now()}`,
      directory: "Download",
    };

    const file = await RNHTMLtoPDF.convert(options);

    dispatch({
      type: "SET_SHOW_ALERT",
      payload: {
        type: "success",
        show: true,
        message: `Berhasil download file, file tersimpan di ${file.filePath}`,
      },
    });
  };

  const fetchData = async (state) => {
    await getDetailKas(id, state);
    await getArusKasBulanIni(id);
  };

  const onRefresh = useCallback(() => {
    fetchData("refresh");

    return () => {
      setDetailKas({});
      setRefreshDetailKas(false);
      setDataArusKas([]);
      setPemasukan(0);
      setPengeluaran(0);
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData("loading");

      return () => {
        setDetailKas({});
        setLoadDetailKas(true);
        setDataArusKas([]);
        setPemasukan(0);
        setPengeluaran(0);
      };
    }, [])
  );

  return (
    <NativeBaseProvider>
      <Header title={title} navigation={navigation} />
      {alert.show && <Alert />}

      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshDetailKas}
            onRefresh={onRefresh}
            colors={["crimson", "coral"]}
          />
        }
      >
        <Provider>
          <Portal>
            <View style={styles.wrapper}>
              <View style={[styles.card, styles.items]}>
                <View style={{ marginLeft: 10 }}>
                  <FontAwesome5 name="money-check" size={60} />
                </View>
                <View style={{ marginLeft: 15 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontFamily: "Raleway_500Medium",
                    }}
                  >
                    Total Pemasukan :{" "}
                    <NumberFormat
                      value={
                        loadDetailKas ? "0" : detailKas.kas.total_pemasukan
                      }
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp. "}
                      renderText={(value, props) => (
                        <Text
                          style={{
                            color: "blue",
                            fontFamily: "Raleway_400Regular",
                          }}
                        >
                          {value}
                        </Text>
                      )}
                    />
                  </Text>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontFamily: "Raleway_500Medium",
                    }}
                  >
                    Total Pengeluaran :{" "}
                    <NumberFormat
                      value={
                        loadDetailKas ? "0" : detailKas.kas.total_pengeluaran
                      }
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp. "}
                      renderText={(value, props) => (
                        <Text
                          style={{
                            color: "red",
                            fontFamily: "Raleway_400Regular",
                          }}
                        >
                          {value}
                        </Text>
                      )}
                    />
                  </Text>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontFamily: "Raleway_500Medium",
                    }}
                  >
                    Total Kas :{" "}
                    <NumberFormat
                      value={loadDetailKas ? "0" : detailKas.kas.total_kas}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp. "}
                      renderText={(value, props) => (
                        <Text
                          style={{
                            color: "green",
                            fontFamily: "Raleway_400Regular",
                          }}
                        >
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
                style={{ marginVertical: 15, paddingLeft: 15, width: "83%" }}
              >
                <Input
                  type="text"
                  placeholder="Cari data disini ..."
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
                    filterUser(text);
                  }}
                  style={{
                    fontFamily: "Raleway_400Regular",
                  }}
                />
              </View>
              <View
                style={{ marginVertical: 15, paddingLeft: 5, width: "14%" }}
              >
                <Menu
                  onOpen={() => console.log("open option")}
                  onClose={() => console.log("close option")}
                  trigger={(triggerProps) => (
                    <IconButton
                      {...triggerProps}
                      variant="outline"
                      colorScheme="gray"
                      icon={<Ionicons name="ellipsis-vertical" size={34} />}
                      style={{
                        borderRadius: 7,
                      }}
                    />
                  )}
                >
                  <Menu.Item>Belum Bayar</Menu.Item>
                </Menu>
              </View>
            </View>

            {loadDetailKas ? (
              <Loading />
            ) : (
              <Basic navigation={navigation} kas={detailKas.per_user} />
            )}

            <FloatingButton
              navigation={navigation}
              id={id}
              actions={[
                {
                  icon: "cash-plus",
                  label: "Setor Kas",
                  onPress: () =>
                    navigation.navigate("FormPenyetoran", {
                      method: "post",
                      event_kas_id: id,
                      group_id: group_id,
                    }),
                  small: false,
                },
                {
                  icon: "cash-minus",
                  label: "Buat Pengeluaran",
                  onPress: () =>
                    navigation.navigate("FormPengeluaran", {
                      method: "post",
                      event_kas_id: id,
                      group_id: group_id,
                    }),
                  small: false,
                },
                {
                  icon: "file",
                  label: "History Kas",
                  onPress: () =>
                    navigation.navigate("HistoryKasKeseluruhan", {
                      id: id,
                    }),
                  small: false,
                },
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
      </ScrollView>
    </NativeBaseProvider>
  );
};

const Basic = ({ navigation, kas }) => {
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
              <Ionicons name="person" size={30} color="white" />
            </Avatar>
            <VStack>
              <Text
                style={{
                  fontFamily: "Raleway_400Regular",
                }}
              >
                {item.user.name}
              </Text>
              <Text>
                <NumberFormat
                  value={item.total}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Rp. "}
                  renderText={(value, props) => (
                    <Text
                      style={{
                        fontSize: 13,
                        color: "gray",
                        fontFamily: "Raleway_400Regular",
                      }}
                    >
                      {value}
                    </Text>
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
        bg="info.500"
        justifyContent="center"
        onPress={() => {
          navigation.navigate("HistoryKasPerAnggota", {
            event_id: data.item.event_kas_id,
            user: { id: data.item.user.id, name: data.item.user.name },
            total: data.item.total,
            bulan_ini: data.item.total,
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
      {kas.length > 0 ? (
        <SwipeListView
          data={kas}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-65}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={1000}
          onRowDidOpen={onRowDidOpen}
        />
      ) : (
        <ScrollView>
          <LottieView
            source={require("../../../assets/data-not-found.json")}
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

export default DetailKas;
