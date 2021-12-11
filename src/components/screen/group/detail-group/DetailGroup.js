import React, { useCallback } from "react";
import { KeyboardAvoidingView, RefreshControl, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/core";
import {
  Avatar,
  Box,
  HStack,
  VStack,
  Input,
  NativeBaseProvider,
  Pressable,
  Text,
  View,
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { StyleSheet } from "react-native";
import { Portal, Provider } from "react-native-paper";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import Ionicons from "react-native-vector-icons/Ionicons";
import "moment/locale/id";
import moment from "moment";
import { useFonts, Raleway_400Regular } from "@expo-google-fonts/raleway";
import { useSelector, useDispatch } from "react-redux";

// component
import Header from "../../../reusable/Header";
import Alert from "../../../reusable/Alert";
import DetailGroupHelper from "./DetailGroupHelper";
import FloatingButton from "../../../reusable/FloatingButton";
import Loading from "../../../reusable/Loading";
import LottieView from "lottie-react-native";

const DetailGroup = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  const { group_id, nama } = route.params;
  const {
    detailGroup,
    setDetailGroup,
    loadDetailGroup,
    setLoadDetailGroup,
    refreshDetailGroup,
    setRefreshDetailGroup,
    getDetailGroup,
    keyword,
    setKeyword,
    filterData,
  } = DetailGroupHelper(navigation);

  const [fontsLoaded, error] = useFonts({
    Raleway_400Regular,
  });

  const buatPdf = async () => {
    const options = {
      html: `
        <div style="text-align: center;"><h3>Data Usman Sidomulyo</h3></div>
        <table style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr style="background-color: #04aa6d; color: white;">
              <th style="border: 1px solid #ddd; padding: 8px;">#</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Nama</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Jenis Kelamin</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Ayah</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Ibu</th>
              <th style="border: 1px solid #ddd; padding: 8px;">TTL</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${detailGroup.map(
              (usman, i) => `
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${i + 1}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${
                  usman.name
                }</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${
                  parseInt(usman.jenis_kelamin) ? "Laki-laki" : "Perempuan"
                }</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${
                  usman.nama_ayah
                }</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${
                  usman.nama_ibu
                }</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${
                  usman.tempat_lahir
                }, ${moment(parseInt(usman.tgl_lahir)).format("LL")}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${
                  usman.status
                }</td>
              </tr>
            `
            )}
          </tbody>
        </table>
      `,
      fileName: `Data_Usman_${Date.now()}`,
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

  const onRefresh = useCallback(() => {
    getDetailGroup(group_id, "refresh");

    return () => {
      setDetailGroup([]);
      setRefreshDetailGroup(false);
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      getDetailGroup(group_id, "loading");

      return () => {
        setDetailGroup([]);
        setLoadDetailGroup(true);
      };
    }, [])
  );

  return (
    <NativeBaseProvider>
      <Header
        title={nama.length > 15 ? `${nama.substr(0, 15)}...` : nama}
        navigation={navigation}
      />

      {alert.show && <Alert />}

      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshDetailGroup}
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
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            >
              <View
                style={{ marginVertical: 15, paddingLeft: 15, width: "97%" }}
              >
                <Input
                  type="text"
                  placeholder="Cari anggota disini ..."
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

            {loadDetailGroup ? (
              <Loading />
            ) : (
              <Basic
                navigation={navigation}
                detailGroup={detailGroup}
                group_id={group_id}
              />
            )}

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
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default DetailGroup;

const Basic = ({ navigation, detailGroup, group_id }) => {
  const user = useSelector((state) => state.user.data);
  const currentGroup = user.user_group.filter(
    (item) => parseInt(item.group_id) === parseInt(group_id)
  )[0];

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
              <Text
                style={{
                  fontSize: 12,
                  color: "grey",
                  fontFamily: "Raleway_400Regular",
                }}
              >
                {item.hak_akses}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "grey",
                  fontFamily: "Raleway_400Regular",
                }}
              >
                Terdaftar pada{" "}
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
        bg="info.500"
        justifyContent="center"
        onPress={() => {
          navigation.navigate("DetailPeserta", {
            user: data.item.user,
            group_id: group_id,
            currentGroup: currentGroup,
            currentUser: user,
          });
        }}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <Ionicons name="eye" size={30} color="#fff" />
      </Pressable>

      {user.hak_akses === "administrator" && (
        <Pressable
          px={4}
          bg="red.500"
          justifyContent="center"
          onPress={() =>
            navigation.navigate("FormPeserta", {
              payload: data.item.user,
              group_id: group_id,
              hak_akses: data.item.hak_akses,
              method: "put",
              judul: "Update Peserta",
            })
          }
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
      {detailGroup.length > 0 ? (
        <SwipeListView
          data={detailGroup}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={user.hak_akses === "administrator" ? -130 : -65}
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
