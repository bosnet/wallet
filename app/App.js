import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {
  AsyncStorage,
} from 'react-native';
import AppStorage from './libs/AppStorage';

import AppReducer from './reducers';
import { AppNavigator, middleware } from './AppNavigator';
import AndroidBackHandler from './AndroidBackHandler';

import { Accounts } from './actions';

const store = createStore(AppReducer, applyMiddleware(middleware));

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    AsyncStorage.clear();
    AppStorage.loadAccountsAsync().then((accounts) => {
      if (accounts && accounts.length > 0) store.dispatch(Accounts.loadAccounts(accounts));
    });
  }

  render() {
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
