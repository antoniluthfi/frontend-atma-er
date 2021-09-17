import React, { useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { View, StyleSheet } from "react-native";
import {
  NativeBaseProvider,
  TextArea,
  FormControl,
  Select,
  Button,
  Text,
  ScrollView,
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../../reusable/Header";

const inputValidationSchema = yup.object().shape({
  user_id: yup.string().required("Anggota masih kosong tuh, isi dulu yaa"),
  event_pengajian_id: yup
    .string()
    .required("Event pengajian masih kosong tuh, isi dulu yaa"),
  status_hadir: yup.string().required("Status hadir nya diisi dulu yaa"),
});

const BuatAbsenBaru = ({ navigation }) => {
  return (
    <NativeBaseProvider>
      <Header title="Buat Absen Baru" navigation={navigation} />

      <Formik
        initialValues={{
          user_id: "",
          event_pengajian_id: "",
          status_hadir: "",
          keterangan: "",
        }}
        onSubmit={(values) => console.log(values)}
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
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.taskWrapper}>
                <View
                  style={{
                    paddingVertical: 10,
                  }}
                >
                  <FormControl isRequired style={{ marginVertical: 10 }}>
                    <FormControl.Label>Nama Anggota</FormControl.Label>
                    <Select
                      onValueChange={handleChange("user_id")}
                      onBlur={handleBlur("user_id")}
                      selectedValue={values.user_id}
                      minWidth={200}
                      accessibilityLabel="Pilih Anggota"
                      placeholder="Pilih Anggota"
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
                      <Select.Item label="Toni" value="1" />
                      <Select.Item label="Irfan" value="2" />
                      <Select.Item label="Sauri" value="3" />
                    </Select>

                    {errors.user_id && touched.user_id && (
                      <Text style={{ fontSize: 11, color: "red" }}>
                        {errors.user_id}
                      </Text>
                    )}
                  </FormControl>

                  <FormControl isRequired style={{ marginVertical: 10 }}>
                    <FormControl.Label>Pengajian</FormControl.Label>
                    <Select
                      onValueChange={handleChange("event_pengajian_id")}
                      onBlur={handleBlur("event_pengajian_id")}
                      selectedValue={values.event_pengajian_id}
                      minWidth={200}
                      accessibilityLabel="Pengajian"
                      placeholder="Pengajian"
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
                      <Select.Item
                        label="Usman, Sabtu 14 Agustus 2021"
                        value="1"
                      />
                    </Select>

                    {errors.event_pengajian_id &&
                      touched.event_pengajian_id && (
                        <Text style={{ fontSize: 11, color: "red" }}>
                          {errors.event_pengajian_id}
                        </Text>
                      )}
                  </FormControl>

                  <FormControl isRequired style={{ marginVertical: 10 }}>
                    <FormControl.Label>Status Kehadiran</FormControl.Label>
                    <Select
                      onValueChange={handleChange("status_hadir")}
                      onBlur={handleBlur("status_hadir")}
                      selectedValue={values.status_hadir}
                      minWidth={200}
                      accessibilityLabel="Status Kehadiran"
                      placeholder="Status Kehadiran"
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
                      <Select.Item label="Hadir" value="2" />
                      <Select.Item label="Izin" value="1" />
                      <Select.Item label="Sakit" value="0" />
                    </Select>

                    {errors.status_hadir && touched.status_hadir && (
                      <Text style={{ fontSize: 11, color: "red" }}>
                        {errors.status_hadir}
                      </Text>
                    )}
                  </FormControl>

                  <FormControl style={{ marginVertical: 10 }}>
                    <FormControl.Label>Keterangan</FormControl.Label>
                    <TextArea
                      onChangeText={handleChange("keterangan")}
                      onBlur={handleBlur("keterangan")}
                      value={values.keterangan}
                      _light={{
                        placeholderTextColor: "blueGray.400",
                      }}
                      _dark={{
                        placeholderTextColor: "blueGray.50",
                      }}
                    />
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
        )}
      </Formik>
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
});

export default BuatAbsenBaru;
