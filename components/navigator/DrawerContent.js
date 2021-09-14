import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  NativeBaseProvider,
  Box,
  Pressable,
  HStack,
  VStack,
  Text,
  Avatar,
  Divider,
  Icon,
} from "native-base";
import axios from "axios";
import { TEST_URL } from "@env";
import { useDispatch, useSelector } from "react-redux";

const DrawerContent = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const logout = async () => {
    dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    console.log("logout");
    await axios({
      method: "POST",
      url: `${TEST_URL}/logout`,
      data: {},
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(() => {
        dispatch({
          type: "LOGOUT",
          payload: {
            user: null,
            token: null,
          },
        });
      })
      .catch((error) => {
        console.log(error.message);
      });

    dispatch({
      type: "SET_LOADING",
      payload: false,
    });
  };

  return (
    <NativeBaseProvider>
      <DrawerContentScrollView {...props} safeArea>
        <VStack space={6} my={2} mx={1}>
          <HStack space={2} pt={2}>
            <Box pl={4}>
              <Avatar
                source={{
                  uri: "https://pbs.twimg.com/profile_images/1309797238651060226/18cm6VhQ_400x400.jpg",
                }}
              >
                AK
              </Avatar>
            </Box>
            <Box pr={4}>
              <Text bold color="gray.700">
                {user.data && user.data.name}
              </Text>
              <Text fontSize={14} mt={1} color="gray.500" fontWeight={500}>
                {user.data && user.data.email}
              </Text>
            </Box>
          </HStack>
          <VStack divider={<Divider />} space={4}>
            <VStack space={5}>
              <VStack space={3}>
                <Pressable
                  px={5}
                  py={3}
                  style={({ pressed, hovered, focused }) => [
                    {
                      backgroundColor: pressed
                        ? "rgba(245, 101, 17, 0.5)"
                        : "white",
                    },
                  ]}
                >
                  <HStack space={7} alignItems="center">
                    <Icon
                      color="gray.500"
                      size={5}
                      as={<MaterialCommunityIcons name="account" />}
                    />
                    <Text color="gray.700" fontWeight={500}>
                      Profilku
                    </Text>
                  </HStack>
                </Pressable>
                <Pressable
                  px={5}
                  py={2}
                  style={({ pressed, hovered, focused }) => [
                    {
                      backgroundColor: pressed
                        ? "rgba(245, 101, 17, 0.5)"
                        : "white",
                    },
                  ]}
                >
                  <HStack space={7} alignItems="center">
                    <Icon
                      color="gray.500"
                      size={5}
                      as={<MaterialCommunityIcons name="key" />}
                    />
                    <Text color="gray.700" fontWeight={500}>
                      Ganti Password
                    </Text>
                  </HStack>
                </Pressable>
                <Pressable
                  px={5}
                  py={3}
                  style={({ pressed, hovered, focused }) => [
                    {
                      backgroundColor: pressed
                        ? "rgba(245, 101, 17, 0.5)"
                        : "white",
                    },
                  ]}
                >
                  <HStack space={7} alignItems="center">
                    <Icon
                      color="gray.500"
                      size={5}
                      as={<MaterialCommunityIcons name="bookmark" />}
                    />
                    <Text fontWeight={500} color="gray.700">
                      Tentang Aplikasi
                    </Text>
                  </HStack>
                </Pressable>
                <Pressable
                  px={5}
                  py={3}
                  style={({ pressed, hovered, focused }) => [
                    {
                      backgroundColor: pressed
                        ? "rgba(245, 101, 17, 0.5)"
                        : "white",
                    },
                  ]}
                  onPress={() => {
                    props.navigation.closeDrawer();
                    logout();
                  }}
                >
                  <HStack space={7} alignItems="center">
                    <Icon
                      color="gray.500"
                      size={5}
                      as={<MaterialCommunityIcons name="logout" />}
                    />
                    <Text fontWeight={500} color="gray.700">
                      Logout
                    </Text>
                  </HStack>
                </Pressable>
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </DrawerContentScrollView>
    </NativeBaseProvider>
  );
};

export default DrawerContent;
