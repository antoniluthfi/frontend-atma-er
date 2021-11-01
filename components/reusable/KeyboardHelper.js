import { Keyboard } from "react-native";
import { useDispatch } from "react-redux";

const KeyboardHelper = (screenName = undefined) => {
  const dispatch = useDispatch();
  const showKeyboard = Keyboard.addListener("keyboardDidShow", () => {
    const a = screenName === "DataUsman" ? 30 : 0;

    dispatch({
      type: "SET_SHOW_TAB",
      payload: {
        barBottom: -40,
        indicatorBottom: -98,
        fabBottom: a,
        fab2Bottom: 10,
      },
    });
  });

  const hideKeyboard = Keyboard.addListener("keyboardDidHide", () => {
    dispatch({
      type: "SET_SHOW_TAB",
      payload: {
        barBottom: 5,
        indicatorBottom: 63,
        fabBottom: 60,
        fab2Bottom: 80,
      },
    });
  });

  return {
    showKeyboard,
    hideKeyboard,
  };
};

export default KeyboardHelper;
