import { Keypair } from '@pigzbe/react-native-stellar-sdk';
import CryptoJS from 'crypto-js';
import {
  ToastAndroid,
} from 'react-native';

import AppStorage from './AppStorage';

const { AES } = CryptoJS;

const checkName = (accountName) => {
  return (element) => {
    return element.name === accountName;
  }
}

const checkAddress = (element, accountAddr) => element.address === accountAddr;

const createAccountAsync = password => Keypair.randomAsync().then(
  (keypair) => {
    const publicKey = keypair.publicKey();
    const secretKey = keypair.secret();
    // SecretSeed 설정
    const secretSeed = AES.encrypt(secretKey, password).toString();

    return AppStorage.loadAccountsAsync().then((accountsStr) => {
      let counter = 1;

      const accounts = JSON.parse(accountsStr);

      // Account Name 자동 설정
      let accountName = `Account ${counter}`;
      if (accounts && accounts.length > 0) {
        while (accounts.findIndex(checkName(`Account ${counter}`)) > -1) {
          counter += 1;
          accountName = `Account ${counter}`;
        }
      }

      const result = {
        name: accountName,
        address: publicKey,
        secretSeed,
      };

      // if (result) {
      //   AppStorage.addAccounts(result);
      // }

      return result;
    });
  },
);

const getKeyPair = () => {
  const keypair = Keypair.fromSecret('S124129');

  return keypair;
};

const createRestoreKeyAsync = async (secretKey, password) => {

  const keypair = Keypair.fromSecret(secretKey);

  const publicKey = keypair.publicKey();
  const secretSeed = `BOS${AES.encrypt(secretKey, password).toString()}`;

  return AppStorage.loadAccountsAsync().then((accountsStr) => {
    let counter = 1;

    const accounts = JSON.parse(accountsStr);

    // Account Name 자동 설정
    let accountName = `Account ${counter}`;
    if (accounts && accounts.length > 0) {
      while (accounts.findIndex(checkName(`Account ${counter}`)) > -1) {
        counter += 1;
        accountName = `Account ${counter}`;
      }
    }

    const result = {
      name: accountName,
      address: publicKey,
      secretSeed,
    };

    // if (result) {
    //   AppStorage.addAccounts(result);
    // }

    return result;
  });
};

const getPublicFromRestore = async (resKey, password) => {
  const secretKey = AES.decrypt(resKey.slice(3), password);
  const keypair = Keypair.fromSecret(secretKey.toString(CryptoJS.enc.Utf8));
  const publicKey = keypair.publicKey();

  return AppStorage.loadAccountsAsync().then((accountsStr) => {
    let counter = 1;

    const accounts = JSON.parse(accountsStr);

    // Account Name 자동 설정
    let accountName = `Account ${counter}`;
    if (accounts && accounts.length > 0) {
      while (accounts.findIndex(checkName(`Account ${counter}`)) > -1) {
        counter += 1;
        accountName = `Account ${counter}`;
      }
    }

    const result = {
      name: accountName,
      address: publicKey,
      secretSeed: resKey,
    };

    // if (result) {
    //   AppStorage.addAccounts(result);
    // }

    return result;
  });
};

export {
  createAccountAsync,
  createRestoreKeyAsync,
  getKeyPair,
  getPublicFromRestore,
};
