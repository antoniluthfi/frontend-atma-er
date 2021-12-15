import React from "react";
import { View, Image, StyleSheet, Text, ScrollView } from "react-native";
import { NativeBaseProvider, Input, Center } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons";
import { PUBLIC_URL } from "@config";

// component
import Header from "../../reusable/Header";
import Alert from "../../reusable/Alert";
import FastImage from "react-native-fast-image";

const Profilku = ({ navigation, route }) => {
  const user = useSelector((state) => state.user.data);
  const alert = useSelector((state) => state.alert);

  return (
    <NativeBaseProvider>
      <Header title="Profilku" navigation={navigation} />
      {alert.show && <Alert />}

      <ScrollView>
        <View style={styles.containerImage}>
          <Image
            style={styles.bgImage}
            source={require("@assets/bg-blue.jpg")}
            // resizeMode="contain"
          />
          <View style={styles.bottomContainer}>
            <FastImage
              style={{
                height: 120,
                width: 120,
                borderRadius: 25,
                bottom: "10%",
              }}
              source={{
                uri: route.params.foto_profil
                  ? `${PUBLIC_URL}/${route.params.foto_profil}`
                  : "https://pbs.twimg.com/profile_images/1309797238651060226/18cm6VhQ_400x400.jpg",
                priority: FastImage.priority.normal,
                cache: FastImage.cacheControl.immutable,
              }}
              resizeMode={FastImage.resizeMode.contain}
              alt="Foto Profil"
            />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={{ color: "gray", bottom: "8%" }}>{user.email}</Text>

            <View style={{ width: "100%", paddingHorizontal: 20 }}>
              <Input
                InputLeftElement={<Ionicons name="home" size={25} />}
                variant="underlined"
                isReadOnly={true}
                value={user.alamat}
              />

              <Input
                InputLeftElement={<Ionicons name="call" size={25} />}
                variant="underlined"
                isReadOnly={true}
                value={user.nomorhp && `+62 ${user.nomorhp.toString()}`}
              />

              <Input
                InputLeftElement={<Ionicons name="man" size={25} />}
                variant="underlined"
                isReadOnly={true}
                value={user.nama_ayah}
              />

              <Input
                InputLeftElement={<Ionicons name="woman" size={25} />}
                variant="underlined"
                isReadOnly={true}
                value={user.nama_ibu}
              />

              <Input
                InputLeftElement={<Ionicons name="calendar" size={25} />}
                variant="underlined"
                isReadOnly={true}
                value={`${user.tempat_lahir}, ${moment(
                  parseInt(user.tgl_lahir)
                ).format("Do MMMM YYYY")}`}
              />

              <Input
                InputLeftElement={<Ionicons name="transgender" size={25} />}
                variant="underlined"
                isReadOnly={true}
                value={
                  parseInt(user.jenis_kelamin) === 1 ? "Laki-laki" : "Perempuan"
                }
              />

              <Input
                InputLeftElement={<Ionicons name="checkmark-done" size={25} />}
                variant="underlined"
                isReadOnly={true}
                value={user.status}
              />

              <Center>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("UpdateProfil", {
                      judul:
                        user.name.length > 20
                          ? `${user.name.substr(0, 20)}...`
                          : user.name,
                      payload: user,
                    })
                  }
                  style={{
                    backgroundColor: "tomato",
                    padding: 10,
                    marginTop: 10,
                    borderRadius: 10,
                  }}
                >
                  <Ionicons name="pencil" size={30} />
                </TouchableOpacity>
              </Center>
            </View>
          </View>
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  containerImage: {
    flex: 1,
    backgroundColor: "tomato",
    justifyContent: "center",
    alignItems: "center",
  },
  bgImage: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "40%",
    top: 0,
    justifyContent: "center",
  },
  bottomContainer: {
    marginTop: "52%",
    height: "90%",
    width: 400,
    backgroundColor: "white",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    alignItems: "center",
  },
  profile: {
    height: 120,
    width: 120,
    borderRadius: 25,
    bottom: "10%",
  },
  name: {
    fontSize: 36,
    fontWeight: "bold",
    bottom: "8%",
  },
});

export default Profilku;
