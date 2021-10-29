import React from "react";
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
  Input,
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import EventKasHelper from "./EventKasHelper";
import KeyboardHelper from "../../../reusable/KeyboardHelper";

import Header from "../../../reusable/Header";
import { useSelector } from "react-redux";

const inputValidationSchema = yup.object().shape({
  nama: yup.string().required("Nama event nya masih kosong tuh, isi dulu yaa"),
  status: yup.string().required("Status hadir nya diisi dulu yaa"),
});

const FormEventKas = ({ navigation, route }) => {
  const user = useSelector((state) => state.user.data);

  const { showKeyboard, hideKeyboard } = KeyboardHelper();
  const { postEventKas, updateEvent } = EventKasHelper(navigation);
  const { judul, method, payload } = route.params;

  React.useEffect(() => {
    showKeyboard;
    hideKeyboard;

    return () => {
      showKeyboard.remove();
      hideKeyboard.remove();
    }
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          nama: method === "put" ? payload.nama : "",
          status: method === "put" ? payload.status.toString() : "",
          grup: method === "put" ? payload.group_id : "",
        }}
        onSubmit={(values) => {
          if (method === "put") {
            updateEvent(payload.id, values);
          } else if (method === "post") {
            postEventKas(values);
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
            <ScrollView>
              <View style={styles.container}>
                <View style={styles.taskWrapper}>
                  <View
                    style={{
                      paddingVertical: 10,
                    }}
                  >
                    <FormControl isRequired style={{ marginVertical: 10 }}>
                      <FormControl.Label>Nama Event</FormControl.Label>
                      <Input
                        onChangeText={handleChange("nama")}
                        onBlur={handleBlur("nama")}
                        value={values.nama}
                        placeholder="Nama Event" // mx={4}
                        _light={{
                          placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                          placeholderTextColor: "blueGray.50",
                        }}
                      />
                    </FormControl>

                    {method === "post" && (
                      <FormControl isRequired style={{ marginVertical: 10 }}>
                        <FormControl.Label>Grup</FormControl.Label>
                        <Select
                          onValueChange={handleChange("grup")}
                          onBlur={handleBlur("grup")}
                          selectedValue={values.grup}
                          minWidth={200}
                          accessibilityLabel="Grup"
                          placeholder="Grup"
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
                          {user.user_group.length > 0 &&
                            user.user_group.map((item, i) => (
                              <Select.Item
                                key={i}
                                label={item.group.nama}
                                value={item.group_id.toString()}
                              />
                            ))}
                        </Select>

                        {errors.grup && touched.grup && (
                          <Text style={{ fontSize: 11, color: "red" }}>
                            {errors.grup}
                          </Text>
                        )}
                      </FormControl>
                    )}

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
                        <Select.Item label="Aktif" value="1" />
                        <Select.Item label="Tidak Aktif" value="0" />
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
                    {method === "put" ? "Update" : "Submit"}
                  </Button>
                </View>
              </View>
            </ScrollView>
          </NativeBaseProvider>
        )}
      </Formik>
    </>
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

export default FormEventKas;
