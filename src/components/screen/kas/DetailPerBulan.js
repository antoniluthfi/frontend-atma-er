import React, { useCallback, useRef, useState } from "react";
import "moment/locale/id";
import moment from "moment";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Dimensions,
} from "react-native";
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
import { translateMonth } from "@utils";
import { Modalize } from "react-native-modalize";
import { getDetailPerBulan } from "@stores/actions/kasActions";

// component
import Header from "@components/reusable/Header";
import Alert from "@components/reusable/Alert";
import Loading from "@components/reusable/Loading";
import { Portal, Provider } from "react-native-paper";
import FloatingButton from "@components/reusable/FloatingButton";

const window = Dimensions.get("window");

const DetailPerBulan = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  const detailPerBulan = useSelector((state) => state.kas.detail_per_bulan);
  const process = useSelector((state) => state.loading);
  const process2 = useSelector((state) => state);
  const { month, event_id, year } = route.params;
  const [keyword, setKeyword] = useState("");

  const [fontsLoaded, error] = useFonts({
    Raleway_400Regular,
    Raleway_500Medium,
  });

  const buatPdf = async () => {
    const options = {
      html: `
        <div style="text-align: center;"><h3>Usman Sidomulyo</h3></div>
        <h5 style="padding: 0; margin: 0;">Total Pemasukan : Rp. ${detailPerBulan?.total?.total}</h5>
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
            ${detailPerBulan?.kas.map(
              (kas, i) => `
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${i + 1}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${
                  kas.user.name
                }</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${
                  parseInt(kas.jenis) ? "Masuk" : "Keluar"
                }</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">Rp. ${
                  kas.total
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
      fileName: `Usman Sidomulyo_${Date.now()}`,
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

  const modalizeRef = useRef(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const fetchData = async (state) => {
    await dispatch(getDetailPerBulan(event_id, month, year, state));
  };

  const onRefresh = useCallback(() => {
    fetchData("refresh");
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData("loading");
    }, [])
  );

  return (
    <NativeBaseProvider>
      <Header
        title={`${translateMonth(month)} ${year}`}
        navigation={navigation}
      />
      {alert.show && <Alert />}

      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={process.refresh}
            onRefresh={() => {
              onRefresh();
              modalizeRef.current?.close();
            }}
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
                      fontFamily: "Raleway_500Medium",
                    }}
                  >
                    Total Kas :{" "}
                    <NumberFormat
                      value={detailPerBulan?.total?.total}
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
                  <Text style={{ fontFamily: "Raleway_400Regular" }}>
                    Bulan {translateMonth(month)} {year}
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
          </Portal>
        </Provider>
      </ScrollView>

      <View style={styles.flatlistWrapper}>
        {detailPerBulan?.kas ? (
          <Basic
            navigation={navigation}
            kas={
              detailPerBulan?.kas?.filter((item) =>
                item.user.name.toLowerCase().match(keyword)
              ) || []
            }
            onOpen={onOpen}
          />
        ) : (
          <Loading />
        )}
      </View>

      <Modalize
        ref={modalizeRef}
        modalTopOffset={200}
        onPositionChange={(e) => console.log(e)}
      >
        <Text>...your content</Text>
      </Modalize>

      <FloatingButton
        navigation={navigation}
        id={event_id}
        actions={[
          {
            icon: "cash-plus",
            label: "Setor Kas",
            onPress: () =>
              navigation.navigate("FormPenyetoran", {
                method: "post",
                event_kas_id: event_id,
                group_id: group_id,
              }),
            small: false,
          },
          {
            icon: "file",
            label: "History Kas",
            onPress: () =>
              navigation.navigate("HistoryKasKeseluruhan", {
                id: event_id,
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
    </NativeBaseProvider>
  );
};

const Basic = ({ navigation, kas, onOpen }) => {
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
              <Ionicons name="wallet" size={30} color="white" />
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
          onOpen();
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
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-65}
          onRowDidOpen={onRowDidOpen}
        />
      ) : (
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
  flatlistWrapper: {
    position: "absolute",
    top: 280,
    width: window.width,
    height: window.height - 280,
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

export default DetailPerBulan;
