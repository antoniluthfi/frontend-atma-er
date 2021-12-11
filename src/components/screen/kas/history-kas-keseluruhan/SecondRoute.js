import React from "react";
import {
  Avatar,
  Box,
  HStack,
  Pressable,
  Text,
  VStack,
} from "native-base";
import NumberFormat from "react-number-format";
import { SwipeListView } from "react-native-swipe-list-view";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FAB } from "react-native-paper";
import Share from "react-native-share";
import Loading from "../../../reusable/Loading";

const SecondRoute = ({ navigation, loadLogPengeluaran, logPengeluaran }) => {
  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const shareKas = async () => {
    try {
      let data = "";
      logPengeluaran.map((item, i) => {
        data += `${i + 1}. ${item.users.name} \n`;
      });

      await Share.open({
        title: "Log pengeluaran kas",
        message: `List pengeluaran usman bulan ini. \n ${data}`,
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
              <MaterialCommunityIcons
                name="cash-minus"
                size={30}
                color="white"
              />
            </Avatar>
            <VStack>
              <Text>{item.keterangan}</Text>
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
      {loadLogPengeluaran ? (
        <Loading />
      ) : (
        <>
          <SwipeListView
            data={logPengeluaran}
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
        </>
      )}
    </Box>
  );
};

export default SecondRoute;
