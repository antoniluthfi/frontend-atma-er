import React from "react";
import { Formik } from "formik";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import "moment/locale/id";
import {
  NativeBaseProvider,
  FormControl,
  Select,
  Button,
  Text,
  ScrollView,
  Input,
  Center,
  Circle,
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFonts, Raleway_400Regular } from "@expo-google-fonts/raleway";
import { useSelector } from "react-redux";

// component
import Alert from "../../reusable/Alert";
import Header from "../../reusable/Header";
import DetailGroupHelper from "./GroupHelper";

const FormGroup = ({ navigation, route }) => {
  const alert = useSelector((state) => state.alert);
  const { judul, method, payload } = route.params;
  const { postDetailGroup, updateDetailGroup } = DetailGroupHelper(navigation);

  const [fontsLoaded, error] = useFonts({
    Raleway_400Regular,
  });

  return (
    <Formik
      initialValues={{
        nama: method === "put" ? payload.nama : "",
        deskripsi: method === "put" ? payload.deskripsi : "",
        foto_profil: method === "put" ? payload.foto_profil : "",
        status: method === "put" ? payload.status : "",
      }}
      onSubmit={(values) => {
        if (method === "put") {
          updateDetailGroup(values, payload.id);
        } else if (method === "post") {
          postDetailGroup(values);
        }
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
      }) => (
        <NativeBaseProvider>
          <Header title={judul} navigation={navigation} />
          {alert.show && <Alert />}

          <ScrollView>
            <View style={styles.container}>
              <View style={styles.taskWrapper}>
                <View
                  style={{
                    paddingVertical: 10,
                  }}
                >
                  <Center flex={1} px="3">
                    <Circle size={175} bg="light.100">
                      <Ionicons name="people" size={150} />
                    </Circle>
                  </Center>

                  <Center>
                    <TouchableOpacity
                      style={{
                        position: "absolute",
                        width: 50,
                        height: 50,
                        borderRadius: 100,
                        backgroundColor: "#38d963",
                        right: "25%",
                        bottom: 0,
                      }}
                    >
                      <Center>
                        <Ionicons name="camera" size={40} color="black" />
                      </Center>
                    </TouchableOpacity>
                  </Center>

                  <FormControl isRequired style={{ marginVertical: 10 }}>
                    <FormControl.Label>
                      <Text
                        style={{
                          fontFamily: "Raleway_400Regular",
                        }}
                      >
                        Nama
                      </Text>
                    </FormControl.Label>
                    <Input
                      onChangeText={handleChange("nama")}
                      onBlur={handleBlur("nama")}
                      value={values.nama}
                      placeholder="Nama" // mx={4}
                      _light={{
                        placeholderTextColor: "blueGray.400",
                      }}
                      _dark={{
                        placeholderTextColor: "blueGray.50",
                      }}
                      style={{
                        fontFamily: "Raleway_400Regular",
                      }}
                    />
                  </FormControl>

                  <FormControl isRequired style={{ marginVertical: 10 }}>
                    <FormControl.Label>
                      <Text
                        style={{
                          fontFamily: "Raleway_400Regular",
                        }}
                      >
                        Deskripsi
                      </Text>
                    </FormControl.Label>
                    <Input
                      onChangeText={handleChange("deskripsi")}
                      onBlur={handleBlur("deskripsi")}
                      value={values.deskripsi}
                      placeholder="Deskripsi" // mx={4}
                      _light={{
                        placeholderTextColor: "blueGray.400",
                      }}
                      _dark={{
                        placeholderTextColor: "blueGray.50",
                      }}
                      style={{
                        fontFamily: "Raleway_400Regular",
                      }}
                    />
                  </FormControl>

                  <FormControl isRequired style={{ marginVertical: 10 }}>
                    <FormControl.Label>
                      <Text
                        style={{
                          fontFamily: "Raleway_400Regular",
                        }}
                      >
                        Status
                      </Text>
                    </FormControl.Label>
                    <Select
                      onValueChange={handleChange("status")}
                      onBlur={handleBlur("status")}
                      selectedValue={
                        values.status ? values.status.toString() : ""
                      }
                      minWidth={200}
                      accessibilityLabel="Status"
                      placeholder="Status"
                      _selectedItem={{
                        bg: "teal.600",
                        endIcon: (
                          <Ionicons
                            name="ios-checkmark"
                            size={30}
                            color="black"
                            style={{ marginLeft: 5 }}
                          />
                        ),
                      }}
                      mt={1}
                      style={{
                        fontFamily: "Raleway_400Regular",
                      }}
                    >
                      <Select.Item label="Aktif" value="1" />
                      <Select.Item label="Tidak Aktif" value="0" />
                    </Select>

                    {errors.jenis_kelamin && touched.jenis_kelamin && (
                      <Text style={{ fontSize: 11, color: "red" }}>
                        {errors.jenis_kelamin}
                      </Text>
                    )}
                  </FormControl>
                </View>
                <Button
                  onPress={handleSubmit}
                  size="md"
                  colorScheme="orange"
                  _text={{ color: "#fff", fontWeight: "bold" }}
                >
                  <Text
                    style={{
                      fontFamily: "Raleway_400Regular",
                      color: "white",
                    }}
                  >
                    {method === "put" ? "Update" : "Submit"}
                  </Text>
                </Button>
              </View>
            </View>
          </ScrollView>
        </NativeBaseProvider>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8eaed",
    paddingBottom: 20,
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
});

export default FormGroup;
