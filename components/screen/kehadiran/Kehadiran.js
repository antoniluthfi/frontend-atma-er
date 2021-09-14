import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";

const Kehadiran = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <View style={{ width: "86%" }}>
          <Text style={styles.sectionTitle}>Buat Absen Baru</Text>
          <Text>Buat absen baru dan lihat perkembangan nya!</Text>
        </View>
        <View style={{ width: "14%" }}>
          <TouchableOpacity
            style={{
              padding: 11,
              marginTop: 5,
              backgroundColor: "tomato",
              borderRadius: 16,
            }}
            onPress={() => navigation.navigate("BuatAbsenBaru")}
          >
            <Ionicons name="ios-add-circle-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.taskWrapper}>
        <View style={{ width: "86%" }}>
          <Text style={styles.sectionTitle}>Update Event Terakhir</Text>
          <Text>Materi Kelas Lambatan Hal 22</Text>
        </View>
        <View style={{ width: "14%" }}>
          <TouchableOpacity
            style={{
              padding: 11,
              marginTop: 5,
              backgroundColor: "tomato",
              borderRadius: 16,
            }}
            onPress={() => navigation.navigate("UpdateEventTerakhir")}
          >
            <Ionicons name="pencil-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8eaed",
  },
  taskWrapper: {
    paddingBottom: 10,
    paddingHorizontal: 8,
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 8,
    width: "95%",
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
});

export default Kehadiran;
