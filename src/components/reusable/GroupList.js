import React from "react";
import { HStack, Text, ScrollView, View } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import {
  useFonts,
  Raleway_400Regular,
  Raleway_500Medium,
} from "@expo-google-fonts/raleway";
import { TouchableOpacity } from "react-native";

const GroupList = ({ groupIndex, changeGroupIndex, refresh = null }) => {
  const user = useSelector((state) => state.user.data);
  const [fontsLoaded, error] = useFonts({
    Raleway_400Regular,
    Raleway_500Medium,
  });

  return (
    <View style={{ flex: 0 }}>
      <ScrollView
        horizontal
        style={{ marginLeft: 10, marginTop: 15, paddingBottom: 5 }}
      >
        <HStack space={user.user_group.length}>
          {user.user_group.map((item) => (
            <TouchableOpacity
              key={item.group_id}
              style={{
                width: "auto",
                marginLeft: 5,
                padding: 5,
                borderRadius: 5,
                backgroundColor:
                  item.group_id === groupIndex ? "tomato" : "white",
              }}
              onPress={() => {
                changeGroupIndex(item.group_id);
                refresh(item.group_id);
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily:
                    item.group_id === groupIndex
                      ? "Raleway_500Medium"
                      : "Raleway_400Regular",
                  color: item.group_id === groupIndex ? "white" : "black",
                }}
              >
                {item.group.nama.length > 15
                  ? `${item.group.nama.substr(0, 15)}...`
                  : item.group.nama}
              </Text>
            </TouchableOpacity>
          ))}
        </HStack>
      </ScrollView>
    </View>
  );
};

export default GroupList;
