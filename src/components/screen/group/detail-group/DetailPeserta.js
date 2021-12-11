import React, { useRef } from "react";
import {
  Center,
  HStack,
  NativeBaseProvider,
  ScrollView,
  VStack,
} from "native-base";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { captureRef } from "react-native-view-shot";
import Share from "react-native-share";
import "moment/locale/id";
import moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  useFonts,
  Raleway_400Regular,
  Raleway_500Medium,
} from "@expo-google-fonts/raleway";
import Header from "../../../reusable/Header";
import DetailGroupHelper from "./DetailGroupHelper";

const DetailPeserta = ({ navigation, route }) => {
  const { user, group_id, currentGroup, currentUser } = route.params;
  const { hapusData } = DetailGroupHelper(navigation);
  const shareRef = useRef();

  const getUmur = () => {
    const tahunSekarang = moment().format("YYYY");
    const tahunLahir = moment(parseInt(user.tgl_lahir)).format("YYYY");
    let umurTahun = tahunSekarang - tahunLahir;

    const bulanSekarang = moment().format("M");
    const bulanLahir = moment(parseInt(user.tgl_lahir)).format("M");
    let umurBulan = Math.abs(bulanSekarang - bulanLahir);
    if (parseInt(bulanSekarang) < parseInt(bulanLahir)) {
      umurTahun -= 1;
      umurBulan += 10;
    }

    const hariSekarang = moment().format("D");
    const hariLahir = moment(parseInt(user.tgl_lahir)).format("D");
    let umurHari = Math.abs(hariSekarang - hariLahir);
    if (parseInt(hariSekarang) < parseInt(hariLahir)) {
      umurBulan -= 1;
    }

    return `${umurTahun} Tahun ${umurBulan} Bulan ${umurHari} Hari`;
  };

  const shareImage = async () => {
    try {
      const uri = await captureRef(shareRef, {
        format: "png",
        quality: 0.7,
      });

      await Share.open({
        title: `Data Diri ${user.name}`,
        message: "",
        url: uri,
        subject: "tes",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [fontsLoaded, error] = useFonts({
    Raleway_400Regular,
    Raleway_500Medium,
  });

  return (
    <NativeBaseProvider>
      <Header title="Detail Peserta" navigation={navigation} />

      <ScrollView style={styles.container}>
        <View style={styles.taskWrapper}>
          <VStack space={2}>
            <View style={styles.card} ref={shareRef}>
              <View style={{ marginLeft: 10, alignItems: "center" }}>
                <Ionicons name="person" size={100} />
              </View>
              <View style={{ marginLeft: 15 }}>
                <Text style={styles.sectionTitle}>{user.name}</Text>
                <Text
                  style={{
                    fontSize: 23,
                    textAlign: "center",
                    fontFamily: "Raleway_500Medium",
                    marginTop: 0,
                  }}
                >
                  {parseInt(user.jenis_kelamin) ? "Laki-laki" : "Perempuan"}
                </Text>

                <Text style={[styles.subTitle]}>Umur</Text>
                <Text style={styles.text}>{getUmur()}</Text>

                <Text style={[styles.subTitle]}>Email</Text>
                <Text style={styles.text}>{user.email}</Text>

                <Text style={[styles.subTitle]}>Nomor Hp</Text>
                <Text style={styles.text}>+62 {user.nomorhp}</Text>

                <Text style={[styles.subTitle]}>Alamat</Text>
                <Text style={styles.text}>{user.alamat}</Text>

                <Text style={[styles.subTitle]}>Nama Ayah</Text>
                <Text style={styles.text}>{user.nama_ayah}</Text>

                <Text style={[styles.subTitle]}>Nama Ibu</Text>
                <Text style={styles.text}>{user.nama_ibu}</Text>

                <Text style={[styles.subTitle]}>Tempat, Tanggal Lahir</Text>
                <Text style={styles.text}>
                  {user.tempat_lahir},
                  {moment(parseInt(user.tgl_lahir)).format("Do MMMM YYYY")}
                </Text>

                <Text style={[styles.subTitle]}>Status</Text>
                <Text style={styles.text}>{user.status}</Text>

                <Text style={[styles.subTitle]}>Hak Akses</Text>
                <Text style={styles.text}>
                  {user.hak_akses === "user" ? "Anggota" : user.hak_akses}
                </Text>
              </View>
            </View>
            <Center>
              <HStack space={2} alignItems="center">
                <TouchableOpacity
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "tomato",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                  }}
                  onPress={shareImage}
                >
                  <Ionicons
                    name="share-social-outline"
                    size={40}
                    color="black"
                  />
                </TouchableOpacity>

                {(currentGroup.hak_akses === "admin pembuat" ||
                  currentGroup.hak_akses === "admin") && (
                  <TouchableOpacity
                    style={{
                      width: 50,
                      height: 50,
                      backgroundColor: "tomato",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                    }}
                    onPress={() =>
                      Alert.alert(
                        "Hmm",
                        "Yakin nih mau dikeluarin dari grup?",
                        [
                          {
                            text: "Gak jadi deh",
                            onPress: () => console.log("gak jadi"),
                            style: "cancel",
                          },
                          {
                            text: "Keluarin aja",
                            onPress: () => hapusData(group_id, user.id),
                          },
                        ]
                      )
                    }
                  >
                    <Ionicons name="exit-outline" size={40} color="black" />
                  </TouchableOpacity>
                )}
              </HStack>
            </Center>
          </VStack>
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8eaed",
  },
  taskWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    width: "95%",
  },
  card: {
    backgroundColor: "white",
    marginHorizontal: 5,
    marginVertical: 7,
    paddingVertical: 25,
    paddingHorizontal: 10,
    borderRadius: 8,
    height: "auto",
  },
  sectionTitle: {
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Raleway_500Medium",
  },
  subTitle: {
    fontSize: 20,
    marginTop: 5,
    fontFamily: "Raleway_500Medium",
  },
  text: {
    fontSize: 17,
    fontFamily: "Raleway_400Regular",
  },
  items: {
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1,
    elevation: 20,
    backgroundColor: "#0000",
  },
  listSection: {
    top: 200,
  },
});

export default DetailPeserta;
