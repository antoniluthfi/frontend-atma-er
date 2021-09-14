import React from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  NativeBaseProvider,
  ScrollView,
  Text,
  View,
} from "native-base";
import * as yup from "yup";
import { Formik } from "formik";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import AuthHelper from "./AuthHelper";

const inputValidationSchema = yup.object().shape({
  name: yup.string().required("Nama nya masih kosong tuh, isi dulu yaa"),
  nomorhp: yup.string().required("Nama nya masih kosong tuh, isi dulu yaa"),
  email: yup.string().required("Email nya masih kosong tuh, isi dulu yaa"),
  password: yup.string().required("Password nya diisi dulu yaa"),
  c_password: yup
    .string()
    .required("Password nya jangan lupa dikonfirmasi yaa"),
});

const Login = ({ navigation }) => {
  const { register } = AuthHelper(navigation);

  return (
    <NativeBaseProvider>
      <View style={{ backgroundColor: "tomato", paddingVertical: 25 }}>
        <Box
          alignSelf={{
            base: "center",
            md: "flex-start",
          }}
        >
          <Center>
            <Ionicons name="people-circle" size={100} color="white" />
          </Center>
          <Heading size="2xl" color="white">
            Usman Sidomulyo
          </Heading>
        </Box>
      </View>

      <ScrollView>
        <Formik
          initialValues={{
            name: "",
            nomorhp: "",
            email: "",
            password: "",
            c_password: "",
          }}
          onSubmit={(values) => {
            register(values);
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
            <View style={styles.container}>
              <View style={styles.taskWrapper}>
                <View
                  style={{
                    paddingVertical: 10,
                  }}
                >
                  <FormControl isRequired style={{ marginVertical: 10 }}>
                    <FormControl.Label>Nama Lengkap</FormControl.Label>
                    <Input
                      type="text"
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      value={values.name}
                      placeholder="Nama Lengkap" // mx={4}
                      _light={{
                        placeholderTextColor: "blueGray.400",
                      }}
                      _dark={{
                        placeholderTextColor: "blueGray.50",
                      }}
                    />
                  </FormControl>

                  <FormControl isRequired style={{ marginVertical: 10 }}>
                    <FormControl.Label>Nomor HP / WhatsApp</FormControl.Label>
                    <Input
                      type="number"
                      onChangeText={handleChange("nomorhp")}
                      onBlur={handleBlur("nomorhp")}
                      value={values.nomorhp}
                      placeholder="Nomor HP / WhatsApp" // mx={4}
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
                      type="email"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      placeholder="Alamat email" // mx={4}
                      _light={{
                        placeholderTextColor: "blueGray.400",
                      }}
                      _dark={{
                        placeholderTextColor: "blueGray.50",
                      }}
                    />
                  </FormControl>

                  <FormControl isRequired style={{ marginVertical: 10 }}>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input
                      type="password"
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      placeholder="Password" // mx={4}
                      _light={{
                        placeholderTextColor: "blueGray.400",
                      }}
                      _dark={{
                        placeholderTextColor: "blueGray.50",
                      }}
                    />
                  </FormControl>

                  <FormControl isRequired style={{ marginVertical: 10 }}>
                    <FormControl.Label>Konfirmasi Password</FormControl.Label>
                    <Input
                      type="password"
                      onChangeText={handleChange("c_password")}
                      onBlur={handleBlur("c_password")}
                      value={values.c_password}
                      placeholder="Password" // mx={4}
                      _light={{
                        placeholderTextColor: "blueGray.400",
                      }}
                      _dark={{
                        placeholderTextColor: "blueGray.50",
                      }}
                    />
                  </FormControl>
                </View>
                <Text
                  onPress={() => navigation.navigate("Login")}
                  style={{ marginBottom: 15, color: "tomato" }}
                >
                  Kalo udah punya akun, langsung login aja disini!
                </Text>

                <Button
                  onPress={handleSubmit}
                  size="md"
                  colorScheme="orange"
                  _text={{ color: "#fff", fontWeight: "bold" }}
                >
                  Register
                </Button>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
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

export default Login;
