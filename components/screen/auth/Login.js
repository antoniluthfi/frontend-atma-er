import React, { useState } from "react";
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
import {
  useFonts,
  Raleway_400Regular,
  Raleway_500Medium,
} from "@expo-google-fonts/raleway";
import AuthHelper from "./AuthHelper";
import Alert from "../../reusable/Alert";
import { useSelector } from "react-redux";

const inputValidationSchema = yup.object().shape({
  email: yup.string().required("Email nya masih kosong tuh, isi dulu yaa"),
  password: yup.string().required("Password nya diisi dulu yaa"),
});

const Login = ({ navigation }) => {
  const alert = useSelector((state) => state.alert);

  const { login } = AuthHelper(navigation);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState("eye");

  const [fontsLoaded, error] = useFonts({
    Raleway_400Regular,
    Raleway_500Medium,
  });

  return !fontsLoaded ? null : (
    <NativeBaseProvider>
      {alert.show && <Alert />}

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
            <Text
              style={{
                fontFamily: "Raleway_500Medium",
                fontSize: 30,
                color: "white",
              }}
            >
              Usman Sidomulyo
            </Text>
          </Heading>
        </Box>
      </View>

      <ScrollView>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            login(values);
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
                      type="email"
                      keyboardType="email-address"
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
                      InputLeftElement={
                        <Ionicons
                          name="mail"
                          size={30}
                          style={{ marginLeft: 8 }}
                        />
                      }
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
                        Password
                      </Text>
                    </FormControl.Label>
                    <Input
                      type={type}
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
                      InputLeftElement={
                        <Ionicons
                          name="key"
                          size={30}
                          style={{ marginLeft: 8 }}
                        />
                      }
                      InputRightElement={
                        <Ionicons
                          name={icon}
                          size={30}
                          style={{ marginRight: 8 }}
                          onPress={() => {
                            if (type === "password") {
                              setType("text");
                              setIcon("eye-off");
                            } else {
                              setType("password");
                              setIcon("eye");
                            }
                          }}
                        />
                      }
                      style={{
                        fontFamily: "Raleway_400Regular",
                      }}
                    />
                  </FormControl>
                </View>
                <Text
                  onPress={() => navigation.navigate("Register")}
                  style={{
                    marginBottom: 15,
                    fontSize: 13,
                    color: "tomato",
                    fontFamily: "Raleway_400Regular",
                  }}
                >
                  Belum pernah daftar? coba daftar dulu deh
                </Text>
                <Button
                  onPress={handleSubmit}
                  size="md"
                  colorScheme="orange"
                  disabled={!values.email || !values.password}
                  _text={{ color: "#fff", fontWeight: "bold" }}
                >
                  <Text
                    style={{
                      fontFamily: "Raleway_500Medium",
                      color: "white",
                    }}
                  >
                    Login
                  </Text>
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
