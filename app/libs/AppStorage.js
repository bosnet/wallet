import {
  AsyncStorage,
} from 'react-native';

const AppStorage = {};

AppStorage.loadAccountsAsync = () => AsyncStorage.getItem('Accounts');

AppStorage.saveAccount = accounts => {
  const accountsObjs = [];
};

export default AppStorage;
