import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/core";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Center, HStack, NativeBaseProvider, Spinner } from "native-base";
import NumberFormat from "react-number-format";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Header from "../../reusable/Header";
import KasHelper from "./KasHelper";

import "moment/locale/id";
import moment from "moment";

const HostoryKasPerAnggota = ({ navigation, route }) => {
  const { event_id, user, total, bulan_ini } = route.params;
  const {
    detailPerUser,
    setDetailPerUser,
    loadDetailPerUser,
    setLoadDetailPerUser,
    getDetailPerUser,
  } = KasHelper();

  useFocusEffect(
    useCallback(() => {
      getDetailPerUser(event_id, user.id);

      return () => {
        setDetailPerUser([]);
        setLoadDetailPerUser(true);
      };
    }, [])
  );

  return (
    <NativeBaseProvider>
      <Header
        title="History Penyetoran"
        navigation={navigation}
        refresh={true}
        _refresh={async () => {
          setDetailPerUser([]);
          setLoadDetailPerUser(true);
          await getDetailPerUser(event_id, user.id);
        }}
      />
      
      <View style={styles.container}>
        <View style={styles.taskWrapper}>
          <View style={styles.card}>
            <View style={{ marginLeft: 10 }}>
              <FontAwesome name="user-circle" size={60} />
            </View>
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.sectionTitle}>{user.name}</Text>
              <Text>
                Total keseluruhan :{" "}
                <NumberFormat
                  value={total}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Rp. "}
                  renderText={(value, props) => <Text>{value}</Text>}
                />
              </Text>
              <Text>
                Total bulan ini :{" "}
                <NumberFormat
                  value={bulan_ini}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Rp. "}
                  renderText={(value, props) => <Text>{value}</Text>}
                />
              </Text>
            </View>
          </View>

          <View style={loadDetailPerUser && styles.listSection}>
            {loadDetailPerUser ? (
              <Center flex={1}>
                <Spinner size="lg" color="warning.500" />
                <Text style={{ marginTop: 15 }}>Tunggu yaa ...</Text>
              </Center>
            ) : detailPerUser.length > 0 ? (
              <>
                <Text
                  style={{
                    marginHorizontal: 5,
                    marginTop: 10,
                    fontSize: 25,
                    fontWeight: "bold",
                  }}
                >
                  List Penyetoran
                </Text>
                {detailPerUser.map((detail, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.card}
                    onPress={() => {
                      navigation.navigate("DetailHistory", {
                        id: detail.id,
                        user_id: detail.user_id,
                        name: detail.users.name,
                        event_kas_id: detail.event_kas_id,
                        event_name: detail.event_kas.nama,
                        jenis: detail.jenis,
                        nominal: detail.nominal,
                        keterangan: detail.keterangan,
                        penerima: detail.pj_arus_kas,
                        tgl_setor: detail.created_at,
                      });
                    }}
                  >
                    <HStack>
                      <View style={{ marginLeft: 10 }}>
                        <MaterialCommunityIcons name="account-cash" size={60} />
                      </View>
                      <View style={{ marginLeft: 15 }}>
                        <Text style={styles.sectionTitle}>
                          <NumberFormat
                            value={detail.nominal}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Rp. "}
                            renderText={(value, props) => <Text>{value}</Text>}
                          />
                        </Text>
                        <Text>
                          Waktu :{" "}
                          {moment(detail.created_at).format(
                            "dddd, Do MMMM YYYY"
                          )}
                        </Text>
                        <Text>Penerima : {detail.users.name}</Text>
                      </View>
                    </HStack>
                  </TouchableOpacity>
                ))}
              </>
            ) : (
              <View style={styles.card}>
                <View style={{ marginLeft: 10 }}>
                  <MaterialCommunityIcons name="close-circle" size={60} />
                </View>
                <View style={{ marginLeft: 15 }}>
                  <Text style={styles.sectionTitle}>Tidak ada history</Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
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
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
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

export default HostoryKasPerAnggota;
