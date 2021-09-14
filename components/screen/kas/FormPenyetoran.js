import React, { useCallback } from "react";
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
  Center,
  Spinner,
} from "native-base";
import { useFocusEffect } from "@react-navigation/core";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../../reusable/Header";
import KasHelper from "./KasHelper";

const inputValidationSchema = yup.object().shape({
  users_id: yup.string().required("Nama masih kosong tuh, isi dulu yaa"),
  nominal: yup.string().required("Nominal nya diisi dulu yaa"),
  keterangan: yup.string().required("Keterangan nya jangan lupa diisi dong"),
});

const FormPenyetoran = ({ navigation, route }) => {
  const { dataUsers, setDataUsers, getDataUsers, setorKas, updateKas } =
    KasHelper(navigation);

  useFocusEffect(
    useCallback(() => {
      getDataUsers();

      return () => {
        setDataUsers([]);
      };
    }, [])
  );

  return (
    <>
      <Formik
        initialValues={{
          event_kas_id: route.params.event_kas_id,
          users_id:
            route.params.method === "post"
              ? ""
              : route.params.users_id.toString(),
          nominal:
            route.params.method === "post"
              ? ""
              : route.params.nominal.toString(),
          keterangan:
            route.params.method === "post" ? "" : route.params.keterangan,
        }}
        onSubmit={(values) => {
          if (route.params.method === "post") {
            setorKas(values);
          } else if (route.params.method === "put") {
            values.event_name = route.params.event_name;
            updateKas(values, route.params.id);
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
            <Header title="Penyetoran Kas" navigation={navigation} />

            {dataUsers.length > 0 ? (
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
                        <Select
                          onValueChange={handleChange("users_id")}
                          onBlur={handleBlur("users_id")}
                          selectedValue={values.users_id}
                          minWidth={200}
                          accessibilityLabel="users_id"
                          placeholder="Nama"
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
                          {dataUsers.map((user, i) => (
                            <Select.Item
                              key={i}
                              label={user.name}
                              value={user.id.toString()}
                            />
                          ))}
                        </Select>

                        {errors.users_id && touched.users_id && (
                          <Text style={{ fontSize: 11, color: "red" }}>
                            {errors.users_id}
                          </Text>
                        )}
                      </FormControl>

                      <FormControl isRequired style={{ marginVertical: 10 }}>
                        <FormControl.Label>Nominal</FormControl.Label>
                        <Input
                          type="number"
                          keyboardType="numeric"
                          onChangeText={handleChange("nominal")}
                          onBlur={handleBlur("nominal")}
                          value={values.nominal}
                          placeholder="Nominal" // mx={4}
                          _light={{
                            placeholderTextColor: "blueGray.400",
                          }}
                          _dark={{
                            placeholderTextColor: "blueGray.50",
                          }}
                        />
                      </FormControl>

                      <FormControl isRequired style={{ marginVertical: 10 }}>
                        <FormControl.Label>Keterangan</FormControl.Label>
                        <TextArea
                          onChangeText={handleChange("keterangan")}
                          onBlur={handleBlur("keterangan")}
                          value={values.keterangan}
                          placeholder="Keterangan" // mx={4}
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
            ) : (
              <Center flex={1}>
                <Spinner size="lg" color="warning.500" />
                <Text>Tunggu yaa ...</Text>
              </Center>
            )}
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

export default FormPenyetoran;
