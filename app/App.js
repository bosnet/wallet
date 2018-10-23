import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {
  AsyncStorage, View
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import AppStorage from './libs/AppStorage';

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
    ]).then((values) => {
      const accounts = values[0];
      const settings = values[1];
      const addressBook = values[2];

      if (accounts && accounts.length > 0) store.dispatch(Accounts.loadAccounts(accounts));
      else store.dispatch(Accounts.loadAccounts([]));

      if (settings) store.dispatch(Settings.setSettings(settings));

      if (addressBook) store.dispatch(AddressBook.setAddress(addressBook));

      store.dispatch(Navigation.resetScreen(Navigation.Screens.HOME));
      this.setState({
        isLoaded: true,
      });

      SplashScreen.hide();
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
        <AndroidBackHandler>
          <AppNavigator />
        </AndroidBackHandler>
      </Provider>
    );
  }
}

export default App;
