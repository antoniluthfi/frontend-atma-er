import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StackedBarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import Header from "../reusable/Header";
import { NativeBaseProvider } from "native-base";
import { useSelector } from "react-redux";
import Alert from "../reusable/Alert";

const screenWidth = Dimensions.get("window").width - 35;
const data = {
  labels: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
  legend: ["Hadir", "Izin", "Sakit", "Alpa"],
  data: [
    [60, 60, 60, 60],
    [30, 30, 60, 60],
    [30, 30, 60, 60],
    [30, 30, 60, 60],
  ],
  barColors: ["#dfe4ea", "#ced6e0", "#a4b0be", "#ff4400"],
};

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  bbackgroundColor: "#e26a00",
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
};

const Home = ({ navigation }) => {
  const alert = useSelector(state => state.alert);

  return (
    <NativeBaseProvider>
      {alert.show && <Alert />}

      <Header title="Beranda" navigation={navigation} />
      <View style={styles.container}>
        <View style={[styles.taskWrapper, styles.item]}>
          <Text style={styles.sectionTitle}>Persentase Kehadiran Usman</Text>
          <View>
            <StackedBarChart
              style={{
                borderColor: "black",
                borderRadius: 8,
              }}
              data={data}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              segments={3}
              decimalPlaces={0}
            />
          </View>
        </View>

        <View
          style={[
            styles.taskWrapper,
            {
              flexDirection: "row",
              flexWrap: "wrap",
            },
          ]}
        >
          <View>
            <Text style={styles.sectionTitle}>Update Materi Terakhir</Text>
            <Text>Materi Kelas Lambatan Hal 22</Text>
          </View>
        </View>

        <View style={styles.taskWrapper}>
          <Text style={styles.sectionTitle}>
            Daftar Anggota Izin Tidak Hadir
          </Text>
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
    paddingBottom: 10,
    paddingHorizontal: 8,
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 8,
    width: "95%",
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

export default Home;
