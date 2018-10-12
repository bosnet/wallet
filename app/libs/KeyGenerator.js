// import { Keypair } from '@pigzbe/react-native-stellar-sdk';
import CryptoJS from 'crypto-js';
import sebakjs from 'sebakjs-util';
import {
  ToastAndroid,
} from 'react-native';

import AppStorage from './AppStorage';

const { AES } = CryptoJS;

const checkName = (accountName) => {
  return (element) => {
    return element.name === accountName;
  };
};

const checkAddress = (element, accountAddr) => element.address === accountAddr;

const createAccountAsync = async (password) => {
  const keypair = sebakjs.generate();

  const publicKey = keypair.address;
  const secretKey = keypair.seed;
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
};

const createRestoreKeyAsync = async (secretKey, password) => {

  const publicKey = sebakjs.getPublicAddress(secretKey);
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
  getPublicFromRestore,
};
