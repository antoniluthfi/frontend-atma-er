import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { View, StyleSheet, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import "moment/locale/id";
import moment from "moment";
import {
  NativeBaseProvider,
  TextArea,
  FormControl,
  Select,
  Button,
  Text,
  ScrollView,
  Input,
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../../reusable/Header";
import { useSelector } from "react-redux";
import DataDiriHelper from "./DataDiriHelper";

const inputValidationSchema = yup.object().shape({
  name: yup.string().required("Nama nya masih kosong tuh, isi dulu yaa"),
  email: yup.string().required("Email nya masih kosong tuh, isi dulu yaa"),
  alamat: yup.string().required("Alamat nya masih kosong tuh, isi dulu yaa"),
  nomorhp: yup.string().required("Nomor HP nya masih kosong tuh, isi dulu yaa"),
  nama_ayah: yup
    .string()
    .required("Nama ayah nya masih kosong tuh, isi dulu yaa"),
  nama_ibu: yup
    .string()
    .required("Nama ibu nya masih kosong tuh, isi dulu yaa"),
  tempat_lahir: yup
    .string()
    .required("Tempat lahir nya masih kosong tuh, isi dulu yaa"),
  tgl_lahir: yup
    .string()
    .required("Tanggal lahir nya masih kosong tuh, isi dulu yaa"),
  jenis_kelamin: yup
    .string()
    .required("Jenis kelamin nya masih kosong tuh, isi dulu yaa"),
  status: yup.string().required("Status nya diisi dulu yaa"),
  hak_akses: yup.string().required("Hak akses nya diisi dulu yaa"),
});

const DataDiri = ({ navigation }) => {
  const user = useSelector((state) => state.user.data);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tglLahir, setTglLahir] = useState(Date.now());

  const { postDataDiri } = DataDiriHelper(navigation);

  useEffect(() => {
    Alert.alert(
      "Pemberitahuan",
      "Silahkan lengkapi data diri untuk bisa menikmati fitur dari aplikasi ini",
      [{ text: "Oke", style: "cancel", onPress: () => console.log("oke") }]
    );
  }, []);

  return (
    <Formik
      initialValues={{
        name: user.name || "",
        email: user.email || "",
        alamat: "",
        nomorhp: "",
        nama_ayah: "",
        nama_ibu: "",
        tempat_lahir: "",
        jenis_kelamin: "",
        status: "",
      }}
      onSubmit={(values) => {
        values.tgl_lahir = tglLahir;

        let message;
        if (!values.name) message = "Nama harus diisi!";
        else if (!values.email) message = "Email harus diisi!";
        else if (!values.alamat) message = "Alamat harus diisi!";
        else if (!values.nomorhp) message = "Nomor hp harus diisi!";
        else if (!values.nama_ayah) message = "Nama ayah harus diisi!";
        else if (!values.nama_ibu) message = "Nama ibu harus diisi!";
        else if (!values.tempat_lahir) message = "Tempat lahir harus diisi!";
        else if (!values.tgl_lahir) message = "Tanggal lahir harus diisi!";
        else if (!values.jenis_kelamin) message = "Jenis kelamin harus diisi!";
        else if (!values.status) message = "Status harus diisi!";

        if (message) {
          Alert.alert("Gagal", message, [
            { text: "Oke", style: "cancel", onPress: () => console.log("oke") },
          ]);
        } else {
          postDataDiri(values);
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
          <Header
            title="Lengkapi Data Diri"
            navigation={navigation}
            menu={false}
          />
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.taskWrapper}>
                <View
                  style={{
                    paddingVertical: 10,
                  }}
                >
                  <FormControl isRequired style={{ marginVertical: 10 }}>
                    <FormControl.Label>Nama</FormControl.Label>
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
                    />
                  </FormControl>

                  <FormControl isRequired style={{ marginVertical: 10 }}>
                    <FormControl.Label>Email</FormControl.Label>
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
                    />
                  </FormControl>

                  <FormControl isRequired style={{ marginVertical: 10 }}>
                    <FormControl.Label>Alamat</FormControl.Label>
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
                    />
                  </FormControl>

                  <FormControl isRequired style={{ marginVertical: 10 }}>
                    <FormControl.Label>Nomor Hp</FormControl.Label>
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
                    />
                  </FormControl>

                  <FormControl isRequired style={{ marginVertical: 10 }}>
                    <FormControl.Label>Nama Ayah</FormControl.Label>
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
                    />
                  </FormControl>

                  <FormControl isRequired style={{ marginVertical: 10 }}>
                    <FormControl.Label>Nama Ibu</FormControl.Label>
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
                    />
                  </FormControl>

                  <FormControl isRequired style={{ marginVertical: 10 }}>
                    <FormControl.Label>Tempat Lahir</FormControl.Label>
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
                    />
                  </FormControl>

                  <FormControl isRequired style={{ marginVertical: 10 }}>
                    <FormControl.Label>Tanggal Lahir</FormControl.Label>
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
                    <FormControl.Label>Jenis Kelamin</FormControl.Label>
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
                    <FormControl.Label>Status</FormControl.Label>
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
                  Submit
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
