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
import { StyleSheet } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import Alert from "../../reusable/Alert";
import { useSelector, useDispatch } from "react-redux";
import {
  useFonts,
  Raleway_400Regular,
  Raleway_500Medium,
} from "@expo-google-fonts/raleway";
import { userRegister } from "@stores/actions/authActions";
import Header from "./Header";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  const [type, setType] = useState({
    type1: "password",
    type2: "password",
  });
  const [icon, setIcon] = useState({
    icon1: "eye",
    icon2: "eye",
  });

  const [fontsLoaded, error] = useFonts({
    Raleway_400Regular,
    Raleway_500Medium,
  });

  return (
    <NativeBaseProvider>
      {alert.show && <Alert />}

      <Header />

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
            dispatch(userRegister(values, navigation));
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
                        Nama Lengkap
                      </Text>
                    </FormControl.Label>
                    <Input
                      autoCapitalize="words"
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
                        Nomor HP / WhatsApp
                      </Text>
                    </FormControl.Label>
                    <Input
                      type="number"
                      keyboardType="numeric"
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
                      type={type.type1}
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
                      InputRightElement={
                        <Ionicons
                          name={icon.icon1}
                          size={30}
                          style={{ marginRight: 8 }}
                          onPress={() => {
                            if (type.type1 === "password") {
                              setType({ ...type, type1: "text" });
                              setIcon({ ...icon, icon1: "eye-off" });
                            } else {
                              setType({ ...type, type1: "password" });
                              setIcon({ ...icon, icon1: "eye" });
                            }
                          }}
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
                        Konfirmasi Password
                      </Text>
                    </FormControl.Label>
                    <Input
                      autoCapitalize="none"
                      type={type.type2}
                      onChangeText={handleChange("c_password")}
                      onBlur={handleBlur("c_password")}
                      value={values.c_password}
                      placeholder="Konfirmasi Password" // mx={4}
                      _light={{
                        placeholderTextColor: "blueGray.400",
                      }}
                      _dark={{
                        placeholderTextColor: "blueGray.50",
                      }}
                      InputRightElement={
                        <Ionicons
                          name={icon.icon2}
                          size={30}
                          style={{ marginRight: 8 }}
                          onPress={() => {
                            if (type.type2 === "password") {
                              setType({ ...type, type2: "text" });
                              setIcon({ ...icon, icon2: "eye-off" });
                            } else {
                              setType({ ...type, type2: "password" });
                              setIcon({ ...icon, icon2: "eye" });
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
                  onPress={() => navigation.navigate("Login")}
                  style={{
                    marginBottom: 15,
                    fontSize: 13,
                    color: "tomato",
                    fontFamily: "Raleway_400Regular",
                  }}
                >
                  Kalo udah punya akun, langsung login aja disini!
                </Text>

                <Button
                  onPress={handleSubmit}
                  size="md"
                  colorScheme="orange"
                  _text={{
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Raleway_500Medium",
                      color: "white",
                    }}
                  >
                    Register
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
    margin: 10,
    backgroundColor: "white",
    borderRadius: 8,
    width: "95%",
  },
});

export default Login;
