import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {
  View, Alert, BackHandler, Linking,
} from 'react-native';

import strings from './resources/strings';

import AppStorage from './libs/AppStorage';
import FirebaseControl from './libs/FirebaseControl';
import { VERSION } from './config/appConfig';
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

  checkAppVersion(accounts, addressBook, settings, recents) {
    const language = (settings && settings.language) ? settings.language : 'ko';
    const Strings = strings[language].OnBoarding.SplashScreen;

    return fetch('https://raw.githubusercontent.com/bosnet/wallet/master/Version.txt', {
      method: 'GET',
      timeout: 3000,
      headers: {
        Accept: 'text/plain',
      },
    })
      .then(response => response.text())
      .then((appVersion) => {
        // console.log(appVersion.split('.'));
        const latest = appVersion.replace(/\n/g, '').split('.');
        // console.log(latest);
        // console.log(latest.length);
        if (latest.length !== 3) throw Error('Wrong VersionCode');

        const current = VERSION.split('.');
        // console.log(current);

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
                  Linking.openURL('market://details?id=com.boswallet');
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
                  Linking.openURL('market://details?id=com.boswallet');
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

export default App;
