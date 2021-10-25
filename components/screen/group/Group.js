import React, { useEffect } from "react";
import {
  NativeBaseProvider,
  View,
  Input,
  Box,
  Pressable,
  HStack,
  Avatar,
  VStack,
  Text,
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { Portal, Provider } from "react-native-paper";
import { Alert, Linking, StyleSheet } from "react-native";
import moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../../reusable/Header";
import Loading from "../../reusable/Loading";
import GroupHelper from "./GroupHelper";
import FloatingButton from "./../../reusable/FloatingButton";

const Group = ({ navigation }) => {
  const {
    user,
    loading,
    setLoading,
    dataGroup,
    setDataGroup,
    keyword,
    setKeyword,
    input,
    setInput,
    getDataGroup,
    daftarGroup,
  } = GroupHelper();

  useEffect(() => {
    getDataGroup();

    return () => {
      setDataGroup([]);
    };
  }, []);

  return (
    <NativeBaseProvider>
      <Header
        title="Pilih Grup"
        navigation={navigation}
        menu={false}
        refresh={true}
        _refresh={async () => {
          setLoading(true);
          setDataGroup([]);

          await getDataGroup();
        }}
      />

      {loading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <Provider>
            <Portal>
              <View
                style={{
                  flexWrap: "wrap",
                  flexDirection: "row",
                  backgroundColor: "#fff",
                }}
              >
                <View
                  style={{ marginVertical: 15, paddingLeft: 15, width: "97%" }}
                >
                  <Input
                    type="text"
                    placeholder="Cari grup disini ..."
                    InputRightElement={
                      <Ionicons
                        name="search"
                        size={30}
                        style={{ marginRight: 10 }}
                      />
                    }
                    value={keyword}
                    onChangeText={(text) => {
                      setKeyword(text);
                      filterData(text);
                    }}
                  />
                </View>
              </View>

              <Basic
                navigation={navigation}
                dataGroup={dataGroup}
                user={user}
                daftarGroup={daftarGroup}
              />

              {user.data.hak_akses === "administrator" && (
                <FloatingButton
                  navigation={navigation}
                  style={{
                    position: "absolute",
                    paddingBottom: 50,
                  }}
                  actions={[
                    {
                      icon: "plus",
                      label: "Buat baru",
                      onPress: () =>
                        navigation.navigate("FormUsman", {
                          payload: null,
                          method: "post",
                          judul: "Form Usman",
                        }),
                      small: false,
                    },
                  ]}
                />
              )}
            </Portal>
          </Provider>
        </View>
      )}
    </NativeBaseProvider>
  );
};

export default Group;

const Basic = ({ navigation, dataGroup, user, daftarGroup }) => {
  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = ({ item, index }) => (
    <Box>
      <Pressable
        style={{ elevation: -100 }}
        onPress={() => console.log("You touched me")}
        alignItems="center"
        bg="white"
        borderBottomColor="trueGray.200"
        borderBottomWidth={1}
        justifyContent="center"
        height={50}
        underlayColor={"#AAA"}
        _pressed={{
          bg: "trueGray.200",
        }}
        py={8}
      >
        <HStack width="100%" px={4}>
          <HStack space={2} alignItems="center">
            <Avatar color="white" bg={"warning.500"}>
              <Ionicons name="people" size={30} color="white" />
            </Avatar>
            <VStack>
              <Text>{item.nama}</Text>
              <Text style={{ fontSize: 12, color: "grey" }}>
                {item.jumlah_anggota} Anggota
              </Text>
              <Text style={{ fontSize: 12, color: "grey" }}>
                Dibuat pada{" "}
                {moment(item.created_at).format("dddd, Do MMMM YYYY")}
              </Text>
            </VStack>
          </HStack>
        </HStack>
      </Pressable>
    </Box>
  );

  const renderHiddenItem = (data, rowMap) => (
    <HStack flex={1} pl={2}>
      {data.item.terdaftar ? (
        <Pressable
          px={4}
          ml="auto"
          bg="success.500"
          justifyContent="center"
          onPress={() => {
            Linking.openURL(
              `whatsapp://send?text=assalamualaikum&phone=${data.item.nomorhp}`
            );
          }}
          _pressed={{
            opacity: 0.5,
          }}
        >
          <Ionicons name="logo-whatsapp" size={30} color="#fff" />
        </Pressable>
      ) : (
        <Pressable
          px={4}
          ml="auto"
          bg="red.500"
          justifyContent="center"
          onPress={() => {
            const values = {
              group_id: data.item.id,
              user_id: user.data.id,
              hak_akses: "pendaftar",
              status: "pending",
            };

            daftarGroup(values);
          }}
          _pressed={{
            opacity: 0.5,
          }}
        >
          <Ionicons name="arrow-redo-outline" size={30} color="#fff" />
        </Pressable>
      )}
    </HStack>
  );

  return (
    <Box bg="white" safeArea flex={1}>
      <SwipeListView
        data={dataGroup}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-60}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={1000}
        onRowDidOpen={onRowDidOpen}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    width: "95%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 25,
    paddingHorizontal: 10,
    borderRadius: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    shadowColor: "#7f5df0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
