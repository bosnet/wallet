import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {
  View, Alert, BackHandler, Linking,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import strings from './resources/strings';

import AppStorage from './libs/AppStorage';
import FirebaseControl from './libs/FirebaseControl';

import { USE_TESTNET } from './config/AppConfig';

import AppReducer from './reducers';
import { AppNavigator, middleware } from './AppNavigator';

import {
  Accounts, Navigation, Settings, AddressBook,
} from './actions';

const store = createStore(AppReducer, applyMiddleware(middleware));

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
    };
  }

  componentDidMount() {
    // AsyncStorage.clear();
    Promise.all([
      AppStorage.loadAccountsAsync(),
      AppStorage.loadSettingsAsync(),
      AppStorage.loadAddressBookAsync(),
      AppStorage.loadRecentAddressAsync(),

    ]).then((values) => {
      const accounts = values[0];
      const settings = values[1];
      const addressBook = values[2];
      const recents = values[3];

      this.checkAppVersion(accounts, addressBook, settings, recents);
      // this.runApp(accounts, addressBook, settings, recents);
    });
  }

  async checkAppVersion(accounts, addressBook, settings, recents) {
    const language = (settings && settings.language) ? settings.language : 'ko';
    const Strings = strings[language].OnBoarding.SplashScreen;

    const versionURL = USE_TESTNET
      ? 'https://raw.githubusercontent.com/bosnet/wallet/master/Version_Testnet.txt'
      : 'https://raw.githubusercontent.com/bosnet/wallet/master/Version.txt';

    return fetch(versionURL, {
      method: 'GET',
      timeout: 5000,
      headers: {
        Accept: 'text/plain',
      },
    })
      .then(response => response.text())
      .then((appVersion) => {
        const latest = appVersion.replace(/\n/g, '').split('.');
        if (latest.length !== 3) throw Error('Wrong VersionCode');

        const VERSION = DeviceInfo.getVersion();
        const current = VERSION.split('.');

        if (
          (latest[0] >= current[0] && latest[1] > current[1])
          || (latest[0] > current[0])
        ) {
          Alert.alert(
            Strings.ALERT_UPDATE_TITLE,
            Strings.ALERT_FORCE_UPDATE_MESSAGE,
            [
              {
                text: Strings.ALERT_BUTTON_UPDATE,
                onPress: () => {
                  if (USE_TESTNET) Linking.openURL('market://details?id=org.blockchainos.wallet.android.testnet');
                  else Linking.openURL('market://details?id=org.blockchainos.wallet.android.mainnet');
                },
              },
              {
                text: Strings.ALERT_BUTTON_QUIT,
                onPress: () => {
                  BackHandler.exitApp();
                },
              },
            ],
            { cancelable: false },
          );
        } else if (latest[0] === current[0] && latest[1] === current[1] && latest[2] > current[2]) {
          Alert.alert(
            Strings.ALERT_UPDATE_TITLE,
            Strings.ALERT_UPDATE_MESSGAE,
            [
              {
                text: Strings.ALERT_BUTTON_UPDATE,
                onPress: () => {
                  if (USE_TESTNET) Linking.openURL('market://details?id=org.blockchainos.wallet.android.testnet');
                  else Linking.openURL('market://details?id=org.blockchainos.wallet.android.mainnet');
                },
              },
              {
                text: Strings.ALERT_BUTTON_LATER,
                onPress: () => {
                  this.runApp(accounts, addressBook, settings, recents);
                },
              },
            ],
            { cancelable: false },
          );
        } else {
          this.runApp(accounts, addressBook, settings, recents);
        }
      })
      .catch((error) => {
        if (error.message === 'Network request failed') {
          Alert.alert(
            Strings.ALERT_GENERAL_TITLE,
            Strings.ALERT_NETWORK_MESSGAE,
            [
              {
                text: Strings.ALERT_BUTTON_RETRY,
                onPress: () => {
                  this.checkAppVersion(accounts, addressBook, settings, recents);
                  // this.runApp(accounts, addressBook, settings, recents);
                },
              },
              {
                text: Strings.ALERT_BUTTON_QUIT,
                onPress: () => {
                  BackHandler.exitApp();
                },
              },
            ],
            { cancelable: false },
          );
        } else {
          Alert.alert(
            Strings.ALERT_GENERAL_TITLE,
            Strings.ALERT_OTHER_ERROR_MESSAGE,
            [
              // {
              //   text: Strings.ALERT_BUTTON_RETRY,
              //   onPress: () => {
              //     this.checkAppVersion(accounts, addressBook, settings, recents);
              //     // this.runApp(accounts, addressBook, settings, recents);
              //   },
              // },
              {
                text: Strings.ALERT_BUTTON_QUIT,
                onPress: () => {
                  BackHandler.exitApp();
                },
              },
            ],
            { cancelable: false },
          );
        }
      });
  }

  runApp(accounts, addressBook, settings, recents) {
    if (accounts && accounts.length > 0) {
      store.dispatch(Accounts.loadAccounts(accounts));
      store.dispatch(Navigation.resetScreen(Navigation.Screens.HOME));
    } else {
      store.dispatch(Accounts.loadAccounts([]));
      store.dispatch(Navigation.resetScreen(Navigation.Screens.WALKTHROUGH));
    }

    if (settings) store.dispatch(Settings.setSettings(settings));

    if (addressBook) store.dispatch(AddressBook.setAddress(addressBook));

    if (recents) store.dispatch(AddressBook.setRecent(recents));

    this.setState({
      isLoaded: true,
    });

    if (!settings || settings.useFirebase) {
      // console.log("useCrashlystic");
      FirebaseControl.useCrashlystic();
      // console.log("useCrashlystic Done");
    }
  }

  render() {
    const { isLoaded } = this.state;

    if (!isLoaded) {
      return (
        <Provider store={store}>
          <View />
        </Provider>
      );
    }

    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

export { store };
export default App;
