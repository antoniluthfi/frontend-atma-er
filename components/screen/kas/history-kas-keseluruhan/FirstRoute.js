import React from "react";
import { Avatar, Box, HStack, Pressable, Text, VStack } from "native-base";
import NumberFormat from "react-number-format";
import { SwipeListView } from "react-native-swipe-list-view";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FAB } from "react-native-paper";
import Share from "react-native-share";

const FirstRoute = ({ navigation, loadLogPenyetoran, logPenyetoran }) => {
  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const shareKas = async () => {
    try {
      let data = "";
      logPenyetoran.map((item, i) => {
        data += `${i + 1}. ${item.users.name} \n`;
      });

      await Share.open({
        title: "Log penyetoran kas",
        message: `List usman yang sudah bayar kas bulan ini. \n ${data}`,
        subject: "tes",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item, index }) => (
    <Box>
      <Pressable
        style={{ elevation: -100 }}
        onPress={() => console.log(item)}
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
              <Ionicons name="person" size={30} color="white" />
            </Avatar>
            <VStack>
              <Text>{item.users.name}</Text>
              <Text>
                <NumberFormat
                  value={item.nominal}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Rp. "}
                  renderText={(value, props) => <Text>{value}</Text>}
                />
              </Text>
            </VStack>
          </HStack>
        </HStack>
      </Pressable>
    </Box>
  );

  return (
    <Box bg="white" safeArea flex={1}>
      <SwipeListView
        data={loadLogPenyetoran ? [] : logPenyetoran}
        renderItem={renderItem}
        previewRowKey={"0"}
        onRowDidOpen={onRowDidOpen}
      />

      <FAB
        style={{
          position: "absolute",
          right: 20,
          bottom: 130,
          backgroundColor: "tomato",
        }}
        small={false}
        icon="share"
        onPress={() => console.log("tes")}
        onPress={shareKas}
      />
    </Box>
  );
};

export default FirstRoute;
