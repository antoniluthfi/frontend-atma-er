import React, { useRef } from "react";
import { Center, HStack, NativeBaseProvider, VStack } from "native-base";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { captureRef } from "react-native-view-shot";
import Share from "react-native-share";
import "moment/locale/id";
import moment from "moment";
import NumberFormat from "react-number-format";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../../reusable/Header";
import KasHelper from "./KasHelper";

const height = Dimensions.get("window").height;

const DetailHistory = ({ navigation, route }) => {
  const {
    id,
    user_id,
    name,
    event_kas_id,
    event_name,
    jenis,
    nominal,
    penerima,
    keterangan,
    tgl_setor,
  } = route.params;
  const { hapusData } = KasHelper(navigation);
  const shareRef = useRef();

  const shareImage = async () => {
    try {
      const uri = await captureRef(shareRef, {
        format: "png",
        quality: 0.7,
      });

      await Share.open({
        title: "Bukti setor kas",
        message: "Bukti setor kas",
        url: uri,
        subject: "tes",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NativeBaseProvider>
      <Header title="Detail History" navigation={navigation} />

      <ScrollView>
        <View style={styles.container}>
          <View style={styles.taskWrapper}>
            <VStack space={2}>
              <View style={styles.card} ref={shareRef}>
                <View style={{ marginLeft: 10, alignItems: "center" }}>
                  <Ionicons name="person-circle" size={100} />
                </View>
                <View style={{ marginLeft: 15 }}>
                  <Text style={styles.sectionTitle}>{name}</Text>
                  <Text
                    style={{
                      fontSize: 23,
                      textAlign: "center",
                      fontWeight: "bold",
                      marginTop: 0,
                    }}
                  >
                    {event_name}
                  </Text>
                  <Text style={[styles.text, { fontWeight: "bold" }]}>
                    Nominal
                  </Text>
                  <Text style={styles.text}>
                    <NumberFormat
                      value={nominal}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp. "}
                      renderText={(value, props) => <Text>{value}</Text>}
                    />
                  </Text>
                  <Text
                    style={[styles.text, { marginTop: 10, fontWeight: "bold" }]}
                  >
                    Penerima
                  </Text>
                  {penerima.length > 0 &&
                    penerima.map((item, i) => (
                      <Text key={i} style={styles.text}>
                        {item.users.name}
                      </Text>
                    ))}

                  <Text
                    style={[styles.text, { marginTop: 10, fontWeight: "bold" }]}
                  >
                    Keterangan
                  </Text>
                  <Text style={styles.text}>{keterangan}</Text>

                  <Text
                    style={[styles.text, { marginTop: 10, fontWeight: "bold" }]}
                  >
                    Tanggal Setor
                  </Text>
                  <Text style={styles.text}>
                    {moment(tgl_setor).format("LLLL")}
                  </Text>
                </View>
              </View>
              <Center>
                <HStack space={3} alignItems="center">
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
                    <Ionicons name="share-social" size={40} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: 50,
                      height: 50,
                      backgroundColor: "tomato",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      navigation.navigate("FormPenyetoran", {
                        method: "put",
                        id: id,
                        event_kas_id: event_kas_id,
                        event_name: event_name,
                        user_id: user_id,
                        jenis: jenis,
                        nominal: nominal,
                        keterangan: keterangan,
                      });
                    }}
                  >
                    <Ionicons name="pencil" size={40} color="black" />
                  </TouchableOpacity>
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
                        "Hapus data",
                        "Yakin nih mau dihapus? gak bakalan bisa dibalikin loh data nya.",
                        [
                          {
                            text: "Gak jadi deh",
                            onPress: () => console.log("gak jadi"),
                            style: "cancel",
                          },
                          {
                            text: "Hapus aja",
                            onPress: () => hapusData(id),
                          },
                        ]
                      )
                    }
                  >
                    <Ionicons name="trash" size={40} color="black" />
                  </TouchableOpacity>
                </HStack>
              </Center>
            </VStack>
          </View>
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8eaed",
    paddingBottom: 120,
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
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    fontSize: 20,
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

export default DetailHistory;
