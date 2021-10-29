import { Keyboard } from "react-native";
import { useDispatch } from "react-redux";


const KeyboardHelper = () => {
  const dispatch = useDispatch();
  const showKeyboard = Keyboard.addListener("keyboardDidShow", () => {
    dispatch({
      type: "SET_SHOW_TAB",
      payload: {
        barBottom: -40,
        indicatorBottom: -98,      
      }
    })
  });

  const hideKeyboard = Keyboard.addListener("keyboardDidHide", () => {
    dispatch({
      type: "SET_SHOW_TAB",
      payload: {
        barBottom: 40,
        indicatorBottom: 98,      
      }
    })
  });

  return {
    showKeyboard,
    hideKeyboard,
  };
};

export default KeyboardHelper;
