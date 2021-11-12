import React from "react";
import { TouchableOpacity } from "react-native";
import { Center, Circle, View } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";

const ProfilePhoto = () => {
  const dispatch = useDispatch();

  return (
    <View>
      <Center flex={1} px="3">
        <Circle size={175} bg="light.100">
          <Ionicons name="people" size={150} />
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
            <Ionicons name="camera" size={40} color="black" />
          </Center>
        </TouchableOpacity>
      </Center>
    </View>
  );
};

export default ProfilePhoto;