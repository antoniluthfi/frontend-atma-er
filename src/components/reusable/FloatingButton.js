import React, { useState } from "react";
import { FAB } from "react-native-paper";

const FloatingButton = ({ navigation, actions, style = null }) => {
  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const defaultStyle = {
    position: "absolute",
    paddingBottom: 0,
  };

  return (
    <FAB.Group
      open={open}
      color="white"
      fabStyle={{
        backgroundColor: "tomato",
      }}
      style={style || defaultStyle}
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
