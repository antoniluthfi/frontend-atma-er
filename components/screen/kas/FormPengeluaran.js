import React, { useCallback } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { View, StyleSheet } from "react-native";
import {
  NativeBaseProvider,
  TextArea,
  FormControl,
  Button,
  Text,
  ScrollView,
  Input,
  Center,
  Spinner,
} from "native-base";
import Header from "../../reusable/Header";
import KasHelper from "./KasHelper";

const inputValidationSchema = yup.object().shape({
  nominal: yup.string().required("Nominal nya diisi dulu yaa"),
  keterangan: yup.string().required("Keterangan nya jangan lupa diisi dong"),
});

const FormPengeluaran = ({ navigation, route }) => {
  const { dataUsers, setorKas, updateKas } = KasHelper(navigation);

  return (
    <NativeBaseProvider>
      <Header title="Pengeluaran Kas" navigation={navigation} />
      {dataUsers.length > 0 ? (
        <ScrollView style={styles.container} keyboardDismissMode="on-drag">
          <Formik
            initialValues={{
              event_kas_id: route.params.event_kas_id,
              nominal:
                route.params.method === "post"
                  ? ""
                  : route.params.nominal.toString(),
              keterangan:
                route.params.method === "post" ? "" : route.params.keterangan,
            }}
            onSubmit={(values) => {
              values = {
                ...values,
                users_id: 0,
                jenis: 0,
              };

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
        <Center flex={1}>
          <Spinner size="lg" color="warning.500" />
          <Text>Tunggu yaa ...</Text>
        </Center>
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

export default FormPengeluaran;
