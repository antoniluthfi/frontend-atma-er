import React from "react";
import { TouchableOpacity } from "react-native";
import { Center, Circle, Image, View } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import FastImage from "react-native-fast-image";

const ProfilePhoto = ({ foto_profil = null }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);

  return (
    <View>
      <Center flex={1} px="3">
        <Circle size={175} bg="light.100">
          {foto_profil ? (
            <FastImage
              style={{ width: 175, height: 175, borderRadius: 100 }}
              source={{
                uri: foto_profil,
                priority: FastImage.priority.normal,
                cache: FastImage.cacheControl.immutable,
              }}
              resizeMode={FastImage.resizeMode.contain}
              alt="Foto Profil"
            />
          ) : (
            <Ionicons name="people" size={150} color="black" />
          )}
        </Circle>
      </Center>

      <Center>
        <TouchableOpacity
          style={{
            position: "absolute",
            width: 50,
            height: 50,
            borderRadius: 100,
            backgroundColor: "#38d963",
            right: "25%",
            bottom: 0,
          }}
          onPress={() => {
            dispatch({
              type: "SET_SHOW_SELECT",
              payload: {
                show: true,
              },
            });
          }}
        >
          <Center>
            <Ionicons name="camera-outline" size={40} color="black" />
          </Center>
        </TouchableOpacity>
      </Center>
    </View>
  );
};

export default ProfilePhoto;
