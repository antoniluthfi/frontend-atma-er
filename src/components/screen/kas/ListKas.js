import React, { useCallback, useState } from "react";
import {
  NativeBaseProvider,
  Box,
  Text,
  Pressable,
  HStack,
  View,
  Input,
  Avatar,
  VStack,
  ScrollView,
} from "native-base";
import { Alert, Dimensions, RefreshControl, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/core";
import { SwipeListView } from "react-native-swipe-list-view";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import moment from "moment";
import NumberFormat from "react-number-format";
import { Portal, Provider } from "react-native-paper";
import LottieView from "lottie-react-native";
import {
  useFonts,
  Raleway_400Regular,
  Raleway_500Medium,
} from "@expo-google-fonts/raleway";
import { getListKas, getDetailKas } from "@stores/actions/kasActions";

// component
import Header from "../../reusable/Header";
import FloatingButton from "../../reusable/FloatingButton";
import Loading from "../../reusable/Loading";
import GroupList from "../../reusable/GroupList";
import { useDispatch, useSelector } from "react-redux";

const window = Dimensions.get("window");

const ListKas = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const process = useSelector((state) => state.loading);
  const listKas = useSelector((state) => state.kas.list_kas);
  const detailKas = useSelector((state) => state.kas.detail_kas);
  const idListKas = useSelector((state) => state.kas.id_list_kas);

  const [keyword, setKeyword] = useState("");
  const [groupIndex, setGroupIndex] = useState(
    user.data?.user_group[0].group_id
  );

  const [fontsLoaded, error] = useFonts({
    Raleway_400Regular,
    Raleway_500Medium,
  });

  const buatPdf = async () => {
    const options = {
      html: `
        <div style="text-align: center;"><h3>Arus Kas Usman Sidomulyo</h3></div>
        <h5 style="padding: 0; margin: 0;">Total Pemasukan : Rp. ${
          listKas.pemasukan
        }</h5>
        <h5 style="padding: 0; margin: 0;">Total Pemasukan : Rp. ${
          listKas.pengeluaran
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
                kas.user.name
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

  const changeGroupIndex = (index) => {
    console.log(index);
    setGroupIndex(index);
  }

  const fetchData = async (group_id, state) => {
    await dispatch(getListKas(group_id, idListKas, state));
    await dispatch(getDetailKas(0, state));
  };

  const onRefresh = useCallback(() => {
    console.log("refresh", groupIndex);
    fetchData(groupIndex, "refresh");
  }, []);
  console.log("umum", groupIndex);

  useFocusEffect(
    useCallback(() => {
      setGroupIndex(user.data.user_group[0].group_id);
      fetchData(user.data.user_group[0].group_id, "loading");

      return () => {
        setGroupIndex(user.data?.user_group[0].group_id);
      };
    }, [])
  );

  return (
    <NativeBaseProvider>
      <Header title="List Kas" navigation={navigation} />
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={process.refresh}
            onRefresh={onRefresh}
            colors={["crimson", "coral"]}
          />
        }
      >
        <Provider>
          <Portal>
            <GroupList
              groupIndex={groupIndex}
              changeGroupIndex={changeGroupIndex}
              refresh={(group_id) => {
                fetchData(group_id, "loading");
              }}
            />

            <View style={styles.wrapper}>
              <View style={[styles.card, styles.items]}>
                <View style={{ marginLeft: 10 }}>
                  <FontAwesome5 name="money-check" size={60} />
                </View>
                <View style={{ marginLeft: 15 }}>
                  <Text
                    style={{
                      fontFamily: "Raleway_500Medium",
                    }}
                  >
                    Total Pemasukan :{" "}
                    <NumberFormat
                      value={listKas.pemasukan}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp. "}
                      renderText={(value, props) => (
                        <Text
                          style={{
                            color: "blue",
                            fontFamily: "Raleway_500Medium",
                          }}
                        >
                          {value}
                        </Text>
                      )}
                    />
                  </Text>

                  <Text
                    style={{
                      fontFamily: "Raleway_500Medium",
                    }}
                  >
                    Total Pengeluaran :
                    <NumberFormat
                      value={listKas.pengeluaran}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp. "}
                      renderText={(value, props) => (
                        <Text
                          style={{
                            color: "red",
                            fontFamily: "Raleway_500Medium",
                          }}
                        >
                          {value}
                        </Text>
                      )}
                    />
                  </Text>

                  <Text
                    style={{
                      fontFamily: "Raleway_500Medium",
                    }}
                  >
                    Total Kas :{" "}
                    <NumberFormat
                      value={listKas.total}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp. "}
                      renderText={(value, props) => (
                        <Text
                          style={{
                            color: "green",
                            fontFamily: "Raleway_500Medium",
                          }}
                        >
                          {value}
                        </Text>
                      )}
                    />
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Raleway_500Medium",
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
                  }}
                  style={{
                    fontFamily: "Raleway_400Regular",
                  }}
                />
              </View>
            </View>
          </Portal>
        </Provider>
      </ScrollView>

      <View style={styles.flatlistWrapper}>
        {process.mini_loading ? (
          <Loading />
        ) : (
          <Basic navigation={navigation} dataEvent={listKas?.data} />
        )}
      </View>

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
              <Ionicons name="wallet" size={30} color="white" />
            </Avatar>
            <VStack>
              <Text
                style={{
                  fontFamily: "Raleway_400Regular",
                }}
              >
                {item.nama}
              </Text>
              <NumberFormat
                value={item.total_kas}
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
          navigation.navigate("DetailKas", {
            title: data.item.nama,
            id: data.item.id,
            group_id: data.item.group_id,
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
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-65}
        onRowDidOpen={onRowDidOpen}
        ListEmptyComponent={
          <ScrollView>
            <LottieView
              source={require("@assets/data-not-found.json")}
              style={{
                marginBottom: 50,
                width: "100%",
                height: 400,
              }}
              autoPlay
              loop
            />
          </ScrollView>
        }
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
  flatlistWrapper: {
    position: "absolute",
    top: 350,
    width: window.width,
    height: window.height - 350,
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
