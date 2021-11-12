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
} from "native-base";
import { useFocusEffect } from "@react-navigation/core";
import { useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";

// component
import Header from "../../reusable/Header";
import Alert from "../../reusable/Alert";
import KasHelper from "./KasHelper";
import Loading from "../../reusable/Loading";

const FormPenyetoran = ({ navigation, route }) => {
  const alert = useSelector((state) => state.alert);
  const { dataUsers, setDataUsers, getDataUsers, setorKas, updateKas } =
    KasHelper(navigation);

  useFocusEffect(
    useCallback(() => {
      getDataUsers(route.params.group_id);

      return () => {
        setDataUsers([]);
      };
    }, [])
  );

  return (
    <NativeBaseProvider>
      <Header title="Penyetoran Kas" navigation={navigation} />
      {alert.show && <Alert />}

      {dataUsers.length > 0 ? (
        <ScrollView style={styles.container} keyboardDismissMode="on-drag">
          <Formik
            initialValues={{
              event_kas_id: route.params.event_kas_id,
              user_id:
                route.params.method === "post"
                  ? ""
                  : route.params.user_id.toString(),
              nominal:
                route.params.method === "post"
                  ? ""
                  : route.params.nominal.toString(),
              keterangan:
                route.params.method === "post" ? "" : route.params.keterangan,
            }}
            onSubmit={(values) => {
              values.jenis = 1;

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
              <View style={styles.taskWrapper}>
                <View
                  style={{
                    paddingVertical: 10,
                  }}
                >
                  <FormControl isRequired style={{ marginVertical: 10 }}>
                    <FormControl.Label>Nama</FormControl.Label>
                    <Select
                      onValueChange={handleChange("user_id")}
                      onBlur={handleBlur("user_id")}
                      selectedValue={values.user_id}
                      minWidth={200}
                      accessibilityLabel="user_id"
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
                      {dataUsers.map((item, i) => (
                        <Select.Item
                          key={i}
                          label={item.user.name}
                          value={item.user.id.toString()}
                        />
                      ))}
                    </Select>

                    {errors.user_id && touched.user_id && (
                      <Text style={{ fontSize: 11, color: "red" }}>
                        {errors.user_id}
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
            )}
          </Formik>
        </ScrollView>
      ) : (
        <Loading />
      )}
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

export default FormPenyetoran;
