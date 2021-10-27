import React from "react";
import { Avatar, Box, HStack, Text, ScrollView, VStack, View } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

const GroupList = () => {
  const user = useSelector((state) => state.user.data);

  return (
    <View style={{ flex: 0 }}>
      <ScrollView
        horizontal
        style={{ marginLeft: 10, marginTop: 15, paddingBottom: 5 }}
      >
        <HStack space={user.user_group.length}>
          {user.user_group.map((item, i) => (
            <Box
              key={i}
              _text={{
                fontSize: "md",
                fontWeight: "medium",
                color: "warmGray.50",
                letterSpacing: "lg",
              }}
              style={{
                width: 60,
                marginHorizontal: 10,
              }}
            >
              <VStack space={2} alignItems="center">
                <Avatar color="white" bg={"warning.500"} size="lg">
                  <Ionicons name="people" size={40} color="white" />
                </Avatar>
                <Text style={{ fontSize: 12 }}>
                  {item.group.nama.length > 6
                    ? `${item.group.nama.substr(0, 6)}...`
                    : item.group.nama}
                </Text>
              </VStack>
            </Box>
          ))}
        </HStack>
      </ScrollView>
    </View>
  );
};

export default GroupList;
