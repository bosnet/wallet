import {
  AsyncStorage,
} from 'react-native';

const AppStorage = {};

AppStorage.getAccounts = () => AsyncStorage.getItem('Accounts');

AppStorage.addAccounts = (newAccount) => {
  AsyncStorage.getItem('Accounts').then((accounts) => {
    if (accounts) {
      accounts.unshift({
        name: newAccount.name,
        publicAddress: newAccount.pAddress,
        publicKey: newAccount.publicKey,
        restoreKey: newAccount.restoreKey,
      });
    }
  });
};


export default AppStorage;
