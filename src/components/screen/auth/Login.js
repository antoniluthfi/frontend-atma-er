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
import { Formik } from "formik";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import {
  useFonts,
  Raleway_400Regular,
  Raleway_500Medium,
} from "@expo-google-fonts/raleway";
import Alert from "../../reusable/Alert";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "@stores/actions/authActions";
import Header from "./Header";

const Login = ({ navigation }) => {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState("eye");

  const [fontsLoaded, error] = useFonts({
    Raleway_400Regular,
    Raleway_500Medium,
  });

  return !fontsLoaded ? null : (
    <NativeBaseProvider>
      {alert.show && <Alert />}

      <Header />

      <ScrollView
        style={{
          backgroundColor: "#e8eaed",
        }}
      >
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => {
            dispatch(userLogin(values));
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
                      autoCapitalize="none"
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
                      autoCapitalize="none"
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
