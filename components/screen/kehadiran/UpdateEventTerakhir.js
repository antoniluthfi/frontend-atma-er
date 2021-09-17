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
  Input,
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../../reusable/Header";

const inputValidationSchema = yup.object().shape({
  event_pengajian_id: yup
    .string()
    .required("Event pengajian masih kosong tuh, isi dulu yaa"),
});

const UpdateEventTerakhir = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [pengajar, setPengajar] = useState([
    {
      nama: "",
      materi: "",
    },
  ]);

  return (
    <NativeBaseProvider>
      <Header title="Update Event Terakhir" navigation={navigation} />

      <Formik
        initialValues={{
          event_pengajian_id: "",
          keterangan: "",
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.container}>
            <View style={styles.taskWrapper}>
              <View
                style={{
                  paddingVertical: 10,
                }}
              >
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
                </FormControl>

                {pengajar.map((item, i) => (
                  <React.Fragment key={i}>
                    <FormControl style={{ marginVertical: 10 }}>
                      <FormControl.Label>Pengajar</FormControl.Label>
                      <Input
                        onChange={(e) => {
                          const val = [...pengajar];
                          val[i].nama = e.target.value;
                          setPengajar(val);
                        }}
                        value={values.keterangan}
                        _light={{
                          placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                          placeholderTextColor: "blueGray.50",
                        }}
                      />
                    </FormControl>

                    <FormControl style={{ marginVertical: 10 }}>
                      <FormControl.Label>Materi</FormControl.Label>
                      <Input
                        onChange={(e) => {
                          const val = [...pengajar];
                          val[i].materi = e.target.value;
                          setPengajar(val);
                        }}
                        value={values.keterangan}
                        _light={{
                          placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                          placeholderTextColor: "blueGray.50",
                        }}
                      />
                    </FormControl>
                  </React.Fragment>
                ))}

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

export default UpdateEventTerakhir;
