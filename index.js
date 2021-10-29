import React from "react";
import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { userReducer } from "./reducer/userReducer";
import { loadingReducer } from "./reducer/loadingReducer";
import { alertReducer } from "./reducer/alertReducer";
import { tabBarReducer } from "./reducer/tabBarReducer";

import App from "./App";

const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  alert: alertReducer,
  tabBar: tabBarReducer
});

const store = createStore(rootReducer);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    accent: "yellow",
  },
};

const Index = () => {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </Provider>
  );
};

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Index);
