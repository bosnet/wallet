import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {
  AsyncStorage, View
} from 'react-native';
import firebase from 'react-native-firebase';

import AppStorage from './libs/AppStorage';
import FirebaseControl from './libs/FirebaseControl';

import AppReducer from './reducers';
import { AppNavigator, middleware } from './AppNavigator';
import AndroidBackHandler from './AndroidBackHandler';

import { Accounts, Navigation, Settings, AddressBook } from './actions';

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

      console.log("Recents")
      console.log(settings);

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
        console.log("useCrashlystic");
        FirebaseControl.useCrashlystic();
        console.log("useCrashlystic Done");
      }
    });
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
