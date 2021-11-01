import * as React from "react";
import { FAB } from "react-native-paper";
import { useSelector } from "react-redux";

const FloatingButton = ({ navigation, actions, style = null }) => {
  const fabBottom = useSelector(state => state.tabBar.fabBottom);
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const defaultStyle = {
    // position: "absolute",
    paddingBottom: fabBottom,
  }

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
