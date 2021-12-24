import React from "react";
import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { LogBox } from "react-native";
import codePush from "react-native-code-push";
import SplashScreen from "react-native-splash-screen";
import firebase from "@react-native-firebase/app";
import { FIREBASE_CONFIG } from "@config";
import App from "./App";

// reducer
import { userReducer } from "@stores/reducer/userReducer";
import { loadingReducer } from "@stores/reducer/loadingReducer";
import { alertReducer } from "@stores/reducer/alertReducer";
import { selectReducer } from "@stores/reducer/selectReducer";
import { kasReducer } from "@stores/reducer/kasReducer";
import { NavigationContainer } from "@react-navigation/native";

LogBox.ignoreAllLogs();

const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  alert: alertReducer,
  select: selectReducer,
  kas: kasReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    accent: "yellow",
  },
};

class Index extends React.Component {
  codePushStatusDidChange(status) {
    switch (status) {
      case codePush.SyncStatus.UP_TO_DATE:
        console.log("codepush is up to date");
        break;
      case codePush.SyncStatus.AWAITING_USER_ACTION:
        console.log("awaiting user action");
        break;
      case codePush.SyncStatus.SYNC_IN_PROGRESS:
        console.log("synch in progreess");
        SplashScreen.hide();
        break;
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log("Checking for updates.");
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log("Downloading package.");
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log("Installing update.");
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log("Up-to-date.");
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log("Update installed.");
        break;
    }
  }

  codePushDownloadDidProgress({ receivedBytes, totalBytes }) {
    if (receivedBytes / totalBytes === 1.0) {
      SplashScreen.hide();
    }
  }

  componentDidMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
    } else {
      firebase.app();
    }

    codePush.sync(
      { updateDialog: true, installMode: codePush.InstallMode.IMMEDIATE },
      this.codePushStatusDidChange(),
      this.codePushDownloadDidProgress
    );
  }

  render() {
    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <App />
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    );
  }
}

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE,
};

let indexScreen = codePush(codePushOptions)(Index);

export default indexScreen;

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(indexScreen);
