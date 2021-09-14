import * as React from "react";
import { FAB, Portal, Provider } from "react-native-paper";

const FloatingButton = ({ navigation, actions }) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <FAB.Group
      open={open}
      color="white"
      fabStyle={{
        backgroundColor: "tomato",
      }}
      style={{
        position: "absolute",
        paddingBottom: 120,
      }}
      icon={open ? "close" : "plus"}
      actions={actions}
      onStateChange={onStateChange}
      onPress={() => {
        if (open) {
          // do something if the speed dial is open
        }
      }}
    />
  );
};

export default FloatingButton;
