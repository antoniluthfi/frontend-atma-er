import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/core";
import { Dimensions, Animated, Pressable } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { NativeBaseProvider, Box, Text, Center, Spinner } from "native-base";
import Header from "../../reusable/Header";
import KasHelper from "./KasHelper";
import FirstRoute from "./history-kas-keseluruhan/FirstRoute";
import SecondRoute from "./history-kas-keseluruhan/SecondRoute";

const initialLayout = { width: Dimensions.get("window").width };

const HistoryKasKeseluruhan = (props) => {
  const {
    logPenyetoran,
    setLogPenyetoran,
    loadLogPenyetoran,
    setLoadLogPenyetoran,
    belumBayar,
    setBelumBayar,
    loadBelumBayar,
    setLoadBelumBayar,
    getLogPenyetoran,
    getBelumBayarKas,
  } = KasHelper();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Log Penyetoran" },
    { key: "second", title: "Belum Bayar Kas" },
  ]);

  const renderScene = SceneMap({
    first: () => (
      <FirstRoute
        navigation={props.navigation}
        logPenyetoran={logPenyetoran}
        loadLogPenyetoran={loadLogPenyetoran}
      />
    ),
    second: () => (
      <SecondRoute
        navigation={props.navigation}
        belumBayar={belumBayar}
        loadBelumBayar={loadBelumBayar}
      />
    ),
  });

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await getLogPenyetoran(props.route.params.id);
        await getBelumBayarKas(props.route.params.id);
      };

      fetchData();

      return () => {
        setLogPenyetoran([]);
        setLoadLogPenyetoran(true);
        setBelumBayar([]);
        setLoadBelumBayar(true);
      };
    }, [])
  );

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });

          return (
            <Box
              key={i}
              flex={1}
              alignItems="center"
              pb={2}
              style={{
                paddingVertical: 10,
              }}
            >
              <Pressable
                onPress={() => {
                  setIndex(i);
                }}
              >
                <Animated.Text
                  style={{ opacity, fontSize: 17, fontWeight: "bold" }}
                >
                  {route.title}
                </Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <NativeBaseProvider>
      <Header title="History Penyetoran" navigation={props.navigation} />
      {loadLogPenyetoran && loadBelumBayar ? (
        <Center flex={1}>
          <Spinner size="lg" color="warning.500" />
          <Text>Tunggu yaa ...</Text>
        </Center>
      ) : (
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
      )}
    </NativeBaseProvider>
  );
};

export default HistoryKasKeseluruhan;
