import React, { useState, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import {
  useFonts,
  Raleway_400Regular,
  Raleway_500Medium,
} from "@expo-google-fonts/raleway";

import Header from "../../../reusable/Header";
import Alert from "../../../reusable/Alert";
import DataDiriHelper from "./DataDiriHelper";

const DataDiri = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const alert = useSelector((state) => state.alert);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tglLahir, setTglLahir] = useState(Date.now());

  const { postDataDiri } = DataDiriHelper(navigation);

  const [fontsLoaded, error] = useFonts({
    Raleway_400Regular,
    Raleway_500Medium,
  });

  useEffect(() => {
    dispatch({
      type: "SET_SHOW_ALERT",
      payload: {
        type: "success",
        show: true,
        message:
          "Login Berhasil. Silahkan lengkapi data diri untuk bisa menikmati fitur dari aplikasi ini",
      },
    });
  }, []);

  return (
    <Formik
      initialValues={{
        name: user.name || "",
        email: user.email || "",
        alamat: user.alamat || "",
        nomorhp: user.nomorhp ? user.nomorhp.toString() : "",
        nama_ayah: user.nama_ayah || "",
        nama_ibu: user.nama_ibu || "",
        tempat_lahir: user.tempat_lahir || "",
        jenis_kelamin: user.jenis_kelamin ? user.jenis_kelamin.toString() : "",
        status: user.status ? user.status.toString() : "",
      }}
      onSubmit={(values) => {
        values.tgl_lahir = tglLahir;
        postDataDiri(values);
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
          <Header
            title="Lengkapi Data Diri"
            navigation={navigation}
            menu={false}
            logoutIcon
          />
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
                      autoCapitalize="words"
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
                      autoCapitalize="none"
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
                      autoCapitalize="words"
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
                      autoCapitalize="words"
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
                      autoCapitalize="words"
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
                </View>

                <Button
                  onPress={handleSubmit}
                  size="md"
                  colorScheme="orange"
                  _text={{ color: "#fff", fontWeight: "bold" }}
                >
                  <Text
                    style={{
                      fontFamily: "Raleway_500Medium",
                      color: "white",
                    }}
                  >
                    Submit
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

export default DataDiri;
