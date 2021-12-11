import React, { useCallback } from "react";
import { Formik } from "formik";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import "moment/locale/id";
import {
  NativeBaseProvider,
  FormControl,
  Select,
  Button,
  Text,
  ScrollView,
  Input,
  Center,
  Circle,
  HStack,
} from "native-base";
import { useFocusEffect } from "@react-navigation/core";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFonts, Raleway_400Regular } from "@expo-google-fonts/raleway";
import { useSelector, useDispatch } from "react-redux";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { PUBLIC_URL } from "@config";
import ImagePicker from "react-native-image-crop-picker";

// component
import Alert from "../../reusable/Alert";
import Header from "../../reusable/Header";
import CustomSelect from "../../reusable/CustomSelect";
import DetailGroupHelper from "./GroupHelper";
import ProfilePhoto from "../../reusable/ProfilePhoto";

const FormGroup = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  const { judul, method, payload } = route.params;
  const { user, updateFotoProfil, postDataGroup } =
    DetailGroupHelper(navigation);

  const [photoLink, setPhotoLink] = React.useState({
    path: null,
    mimeType: null,
  });

  const [fontsLoaded, error] = useFonts({
    Raleway_400Regular,
  });

  const getProfilePhoto = (method) => {
    if(method === "post") {
      return photoLink.path;
    }

    if(method === "put") {
      if(payload.foto_profil && !photoLink.path) {
        return `${PUBLIC_URL}/${payload.foto_profil}`;
      } else if(payload.foto_profil && photoLink.path) {
        return photoLink.path;
      }
    }
  }

  useFocusEffect(
    useCallback(() => {
      dispatch({
        type: "SET_SHOW_SELECT",
        payload: {
          show: false,
        },
      });
    }, [])
  );

  return (
    <Formik
      initialValues={{
        nama: method === "put" ? payload.nama : "",
        deskripsi: method === "put" ? payload.deskripsi : "",
        foto_profil: method === "put" ? payload.foto_profil : "",
        status: method === "put" ? payload.status : "",
      }}
      onSubmit={(values) => {
        values.user_id = user.data.id;

        if (method === "put") {
          // updateDetailGroup(values, payload.id);
        } else if (method === "post") {
          postDataGroup(photoLink, values);
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
          {alert.show && <Alert />}

          <CustomSelect>
            <HStack>
              <TouchableOpacity>
                <Circle size={60} bg="danger.500">
                  <Ionicons name="trash-outline" size={40} />
                </Circle>
                <Center>
                  <Text
                    style={{
                      fontFamily: "Raleway_400Regular",
                    }}
                  >
                    Hapus
                  </Text>
                </Center>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: 15,
                }}
                onPress={() =>
                  launchCamera(
                    {
                      mediaType: "photo",
                      quality: 1,
                      cameraType: "front",
                      saveToPhotos: true,
                    },
                    (response) => {
                      if (response.assets && response.assets.length > 0) {
                        ImagePicker.openCropper({
                          path: response.assets[0].uri,
                          width: 300,
                          height: 300,
                        }).then((image) => {
                          dispatch({
                            type: "SET_SHOW_SELECT",
                            payload: {
                              show: false,
                            },
                          });
                      
                          setPhotoLink({
                            path: image.path,
                            mimeType: image.mime,
                          });
                        });
                      }
                    }
                  )
                }
              >
                <Circle size={60} bg="info.400">
                  <Ionicons name="camera-outline" size={40} />
                </Circle>
                <Center>
                  <Text
                    style={{
                      fontFamily: "Raleway_400Regular",
                    }}
                  >
                    Kamera
                  </Text>
                </Center>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: 15,
                }}
                onPress={() => {
                  launchImageLibrary(
                    {
                      mediaType: "photo",
                      quality: 1,
                    },
                    (response) => {
                      ImagePicker.openCropper({
                        path: response.assets[0].uri,
                        width: 300,
                        height: 300,
                      }).then((image) => {
                        dispatch({
                          type: "SET_SHOW_SELECT",
                          payload: {
                            show: false,
                          },
                        });
                    
                        setPhotoLink({
                          path: image.path,
                          mimeType: image.mime,
                        });
                      });
                    }
                  );
                }}
              >
                <Circle size={60} bg="primary.300">
                  <Ionicons name="image-outline" size={40} />
                </Circle>
                <Center>
                  <Text
                    style={{
                      fontFamily: "Raleway_400Regular",
                    }}
                  >
                    Galeri
                  </Text>
                </Center>
              </TouchableOpacity>
            </HStack>
          </CustomSelect>

          <ScrollView
            style={{
              backgroundColor: "#e8eaed",
            }}
          >
            <View style={styles.container}>
              <View style={styles.taskWrapper}>
                <View
                  style={{
                    paddingVertical: 10,
                  }}
                >
                  <ProfilePhoto
                    foto_profil={getProfilePhoto(method)}
                  />

                  <FormControl isRequired style={{ marginVertical: 10 }}>
                    <FormControl.Label>
                      <Text
                        style={{
                          fontFamily: "Raleway_400Regular",
                        }}
                      >
                        Nama
                      </Text>
                    </FormControl.Label>
                    <Input
                      onChangeText={handleChange("nama")}
                      onBlur={handleBlur("nama")}
                      value={values.nama}
                      placeholder="Nama" // mx={4}
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
                        Deskripsi
                      </Text>
                    </FormControl.Label>
                    <Input
                      onChangeText={handleChange("deskripsi")}
                      onBlur={handleBlur("deskripsi")}
                      value={values.deskripsi}
                      placeholder="Deskripsi" // mx={4}
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
                        Status
                      </Text>
                    </FormControl.Label>
                    <Select
                      onValueChange={handleChange("status")}
                      onBlur={handleBlur("status")}
                      selectedValue={
                        values.status ? values.status.toString() : ""
                      }
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
                      style={{
                        fontFamily: "Raleway_400Regular",
                      }}
                    >
                      <Select.Item label="Aktif" value="1" />
                      <Select.Item label="Tidak Aktif" value="0" />
                    </Select>

                    {errors.jenis_kelamin && touched.jenis_kelamin && (
                      <Text style={{ fontSize: 11, color: "red" }}>
                        {errors.jenis_kelamin}
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
                  <Text
                    style={{
                      fontFamily: "Raleway_400Regular",
                      color: "white",
                    }}
                  >
                    {method === "put" ? "Update" : "Submit"}
                  </Text>
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

export default FormGroup;
