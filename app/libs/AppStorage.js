import {
  AsyncStorage,
} from 'react-native';

const AppStorage = {};

AppStorage.loadAccountsAsync = () => {
  return AsyncStorage.getItem('Accounts')
    .then(serialized => JSON.parse(serialized));
};

AppStorage.saveAccountAsync = (accounts) => {
  return AsyncStorage.setItem('Accounts', JSON.stringify(accounts));
};

AppStorage.loadSettingsAsync = () => {
  return AsyncStorage.getItem('Settings')
    .then(serialized => JSON.parse(serialized));
};

AppStorage.saveSettingsAsync = (settings) => {
  return AsyncStorage.setItem('Settings', JSON.stringify(settings));
};

AppStorage.loadAddressBookAsync = () => {
  return AsyncStorage.getItem('AddressBook')
    .then(serialized => JSON.parse(serialized));
};

AppStorage.saveAddressBookAsync = (addressBook) => {
  return AsyncStorage.setItem('AddressBook', JSON.stringify(addressBook));
};

AppStorage.loadRecentAddressAsync = () => {
  return AsyncStorage.getItem('recentAddress')
    .then(serialized => JSON.parse(serialized));
};

AppStorage.saveRecentAddressAsync = (address) => {
  return AsyncStorage.setItem('recentAddress', JSON.stringify(address));
};

export default AppStorage;
