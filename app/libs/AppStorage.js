import {
  AsyncStorage,
} from 'react-native';

const AppStorage = {};

AppStorage.loadAccountsAsync = () => AsyncStorage.getItem('Accounts');

AppStorage.saveAccountAsync = (accounts) => {
  return AsyncStorage.setItem('Accounts', JSON.stringify(accounts));
};

export default AppStorage;
