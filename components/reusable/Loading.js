import React from "react";
import { Center, Spinner, Text } from "native-base";

const Loading = () => {
  return (
    <Center flex={1}>
      <Spinner size="lg" color="warning.500" />
      <Text>Tunggu yaa ...</Text>
    </Center>
  );
};

export default Loading;
