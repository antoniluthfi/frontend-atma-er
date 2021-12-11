import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/core";
import { Dimensions, Animated, Pressable } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { NativeBaseProvider, Box } from "native-base";
import Header from "../../reusable/Header";
import KasHelper from "./KasHelper";
import FirstRoute from "./history-kas-keseluruhan/FirstRoute";
import SecondRoute from "./history-kas-keseluruhan/SecondRoute";
import Loading from "../../reusable/Loading";

const initialLayout = { width: Dimensions.get("window").width };

const HistoryKasKeseluruhan = (props) => {
  const {
    logPenyetoran,
    setLogPenyetoran,
    loadLogPenyetoran,
    setLoadLogPenyetoran,
    logPengeluaran,
    setLogPengeluaran,
    loadLogPengeluaran,
    setLoadLogPengeluaran,
    getLogKas,
  } = KasHelper();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Log Penyetoran" },
    { key: "second", title: "Log Pengeluaran" },
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
        logPengeluaran={logPengeluaran}
        loadLogPengeluaran={loadLogPengeluaran}
      />
    ),
  });

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await getLogKas(props.route.params.id);
      };

      fetchData();

      return () => {
        setLogPenyetoran([]);
        setLoadLogPenyetoran(true);
        setLogPengeluaran([]);
        setLoadLogPengeluaran(true);
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
      <Header
        title="History Kas"
        navigation={props.navigation}
        refresh={true}
        _refresh={async () => {
          setLogPenyetoran([]);
          setLoadLogPenyetoran(true);
          setLogPengeluaran([]);
          setLoadLogPengeluaran(true);
          await getLogKas(props.route.params.id);
        }}
      />
      
      {loadLogPenyetoran && loadLogPengeluaran ? (
        <Loading />
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
