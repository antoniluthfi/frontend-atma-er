import React, { useCallback } from "react";
import { Alert, KeyboardAvoidingView } from "react-native";
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

// component
import Header from "../../../reusable/Header";
import DataUsmanHelper from "./DataUsmanHelper";
import FloatingButton from "../../../reusable/FloatingButton";
import GroupList from "../../../reusable/GroupList";
import Loading from "../../../reusable/Loading";
import LottieView from "lottie-react-native";

const DataUsman = ({ navigation }) => {
  const {
    dataUsman,
    setDataUsman,
    loadDataUsman,
    setLoadDataUsman,
    getDataUsman,
    keyword,
    setKeyword,
    filterData,
  } = DataUsmanHelper(navigation);

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
            ${dataUsman.map(
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

    Alert.alert(
      "Berhasil",
      `Berhasil download file, file tersimpan di ${file.filePath}`,
      [{ text: "Oke deh", style: "cancel" }],
      { cancelable: true }
    );
  };

  useFocusEffect(
    useCallback(() => {
      getDataUsman();

      return () => {
        setDataUsman([]);
        setLoadDataUsman(true);
      };
    }, [])
  );

  return (
    <NativeBaseProvider>
      <Header
        title="Data Usman"
        navigation={navigation}
        refresh={true}
        _refresh={async () => {
          setDataUsman([]);
          setLoadDataUsman(true);
          await getDataUsman();
        }}
      />
      <KeyboardAvoidingView
        behavior="height"
        enabled={true}
        style={styles.container}
      >
        <Provider>
          <Portal>
            <GroupList />

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

            {loadDataUsman ? (
              <Loading />
            ) : (
              <Basic navigation={navigation} dataUsman={dataUsman} />
            )}

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
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
};

export default DataUsman;

const Basic = ({ navigation, dataUsman }) => {
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
                {item.name}
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
        bg="dark.500"
        justifyContent="center"
        onPress={() =>
          navigation.navigate("DetailUsman", {
            user: data.item,
          })
        }
        _pressed={{
          opacity: 0.5,
        }}
      >
        <Ionicons name="eye" size={30} color="#fff" />
      </Pressable>
      <Pressable
        px={4}
        bg="red.500"
        justifyContent="center"
        onPress={() =>
          navigation.navigate("FormUsman", {
            payload: data.item,
            method: "put",
            judul: "Update Usman",
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
      {dataUsman.length > 0 ? (
        <SwipeListView
          data={dataUsman}
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
