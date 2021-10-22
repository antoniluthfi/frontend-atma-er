import React from "react";
import { NativeBaseProvider } from "native-base";
import Header from "../../reusable/Header";
import GroupHelper from "./GroupHelper";

const Group = ({ navigation }) => {
  const { loading, dataGroup, setDataGroup, input, setInput, getDataGroup } =
    GroupHelper();

  useEffect(() => {
    getDataGroup();

    return () => {
      setDataGroup([]);
    };
  }, [input]);

  return (
    <NativeBaseProvider>
      <Header
        title="Pilih Grup"
        navigation={navigation}
        refresh={true}
        _refresh={async () => {}}
      />
    </NativeBaseProvider>
  );
};

export default Group;
