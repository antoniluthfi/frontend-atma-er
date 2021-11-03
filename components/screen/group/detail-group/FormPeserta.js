import React, { useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { View, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import "moment/locale/id";
import moment from "moment";
import {
  NativeBaseProvider,
  FormControl,
  Select,
  Button,
  Text,
  ScrollView,
  Input,
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFonts, Raleway_400Regular } from "@expo-google-fonts/raleway";
import { useSelector } from "react-redux";

// component
import Alert from "../../../reusable/Alert";
import Header from "../../../reusable/Header";
import DetailGroupHelper from "./DetailGroupHelper";

const FormPeserta = ({ navigation, route }) => {
  const alert = useSelector(state => state.alert);
  const { judul, method, payload } = route.params;
  const { postDetailGroup, updateDetailGroup } = DetailGroupHelper(navigation);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tglLahir, setTglLahir] = useState(
    method === "put"
      ? payload.tgl_lahir
        ? parseInt(payload.tgl_lahir)
        : Date.now()
      : Date.now()
  );

  const [fontsLoaded, error] = useFonts({
    Raleway_400Regular,
  });

  return (
    <Formik
      initialValues={{
        name: method === "put" ? payload.name : "",
        email: method === "put" ? payload.email : "",
        alamat: method === "put" ? payload.alamat : "",
        nomorhp:
          method === "put" ? payload.nomorhp && payload.nomorhp.toString() : "",
        nama_ayah: method === "put" ? payload.nama_ayah : "",
        nama_ibu: method === "put" ? payload.nama_ibu : "",
        tempat_lahir: method === "put" ? payload.tempat_lahir : "",
        jenis_kelamin: method === "put" ? payload.jenis_kelamin : "",
        status: method === "put" ? payload.status : "",
        hak_akses: method === "put" ? payload.hak_akses : "",
      }}
      onSubmit={(values) => {
        values.tgl_lahir = tglLahir;

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
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      value={values.name}
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
                        Email
                      </Text>
                    </FormControl.Label>
                    <Input
                      keyboardType="email-address"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      placeholder="Alamat Email" // mx={4}
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
                        Alamat
                      </Text>
                    </FormControl.Label>
                    <Input
                      onChangeText={handleChange("alamat")}
                      onBlur={handleBlur("alamat")}
                      value={values.alamat}
                      placeholder="Alamat Rumah" // mx={4}
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
                        Nomor Hp
                      </Text>
                    </FormControl.Label>
                    <Input
                      keyboardType="numeric"
                      onChangeText={handleChange("nomorhp")}
                      onBlur={handleBlur("nomorhp")}
                      value={values.nomorhp}
                      placeholder="Nomor Hp" // mx={4}
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
                        Nama Ayah
                      </Text>
                    </FormControl.Label>
                    <Input
                      onChangeText={handleChange("nama_ayah")}
                      onBlur={handleBlur("nama_ayah")}
                      value={values.nama_ayah}
                      placeholder="Nama Ayah" // mx={4}
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
                        Nama Ibu
                      </Text>
                    </FormControl.Label>
                    <Input
                      onChangeText={handleChange("nama_ibu")}
                      onBlur={handleBlur("nama_ibu")}
                      value={values.nama_ibu}
                      placeholder="Nama Ibu" // mx={4}
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
                        Tempat Lahir
                      </Text>
                    </FormControl.Label>
                    <Input
                      onChangeText={handleChange("tempat_lahir")}
                      onBlur={handleBlur("tempat_lahir")}
                      value={values.tempat_lahir}
                      placeholder="Tempat Lahir" // mx={4}
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
                        Tanggal Lahir
                      </Text>
                    </FormControl.Label>
                    <Input
                      type="date"
                      value={moment(tglLahir).format("dddd, Do MMMM YYYY")}
                      placeholder="Tanggal Lahir" // mx={4}
                      _light={{
                        placeholderTextColor: "blueGray.400",
                      }}
                      _dark={{
                        placeholderTextColor: "blueGray.50",
                      }}
                      isDisabled
                      InputRightElement={
                        <Ionicons
                          name="calendar"
                          size={30}
                          style={{ marginRight: 10 }}
                          onPress={() => setShowDatePicker(true)}
                        />
                      }
                      style={{
                        fontFamily: "Raleway_400Regular",
                      }}
                    />
                    {showDatePicker && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={new Date(tglLahir)}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={(event, date) => {
                          setShowDatePicker(false);

                          let date2 = Date.now();
                          if (!date) {
                            setTglLahir(date2);
                          } else {
                            date2 = new Date(date);
                            setTglLahir(date2.getTime());
                          }
                        }}
                      />
                    )}
                  </FormControl>

                  <FormControl isRequired style={{ marginVertical: 10 }}>
                    <FormControl.Label>
                      <Text
                        style={{
                          fontFamily: "Raleway_400Regular",
                        }}
                      >
                        Jenis Kelamin
                      </Text>
                    </FormControl.Label>
                    <Select
                      onValueChange={handleChange("jenis_kelamin")}
                      onBlur={handleBlur("jenis_kelamin")}
                      selectedValue={
                        values.jenis_kelamin
                          ? values.jenis_kelamin.toString()
                          : ""
                      }
                      minWidth={200}
                      accessibilityLabel="Jenis Kelamin"
                      placeholder="Jenis Kelamin"
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
                      <Select.Item label="Laki-laki" value="1" />
                      <Select.Item label="Perempuan" value="0" />
                    </Select>

                    {errors.jenis_kelamin && touched.jenis_kelamin && (
                      <Text style={{ fontSize: 11, color: "red" }}>
                        {errors.jenis_kelamin}
                      </Text>
                    )}
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
                      selectedValue={values.status}
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
                      <Select.Item label="Bekerja" value="Bekerja" />
                      <Select.Item label="Kuliah" value="Kuliah" />
                      <Select.Item label="MT" value="Kuliah" />
                      <Select.Item
                        label="Baru Lulus Sekolah"
                        value="Baru Lulus Sekolah"
                      />
                    </Select>

                    {errors.status && touched.status && (
                      <Text style={{ fontSize: 11, color: "red" }}>
                        {errors.status}
                      </Text>
                    )}
                  </FormControl>

                  <FormControl isRequired style={{ marginVertical: 10 }}>
                    <FormControl.Label>
                      <Text
                        style={{
                          fontFamily: "Raleway_400Regular",
                        }}
                      >
                        Hak Akses
                      </Text>
                    </FormControl.Label>
                    <Select
                      onValueChange={handleChange("hak_akses")}
                      onBlur={handleBlur("hak_akses")}
                      selectedValue={values.hak_akses}
                      minWidth={200}
                      accessibilityLabel="Hak Akses"
                      placeholder="Hak Akses"
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
                      <Select.Item
                        label="Administrator"
                        value="administrator"
                      />
                      <Select.Item label="Sekretaris" value="sekretaris" />
                      <Select.Item label="Bendahara" value="bendahara" />
                      <Select.Item label="Anggota" value="user" />
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

export default FormPeserta;
