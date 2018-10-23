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

const validatePassword = (account, password) => {
  try {
    const secretKey = AES.decrypt(account.secretSeed.slice(3), password);
    const publicKey = sebakjs.getPublicAddress(secretKey.toString(CryptoJS.enc.Utf8));
    return publicKey === account.address;
  } catch (e) {
    return false;
  }
};

const validateSecretKey = (account, secretKey) => {
  try {
    const publicKey = sebakjs.getPublicAddress(secretKey);
    return publicKey === account.address;
  } catch (e) {
    return false;
  }
};

const createAccountAsync = async (password) => {
  const keypair = sebakjs.generate();

  const publicKey = keypair.address;
  const secretKey = keypair.seed;
  // SecretSeed 설정
  const secretSeed = `BOS${AES.encrypt(secretKey, password).toString()}`;

  return AppStorage.loadAccountsAsync().then((accounts) => {
    let counter = 1;

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

  return AppStorage.loadAccountsAsync().then((accounts) => {
    let counter = 1;

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
  const publicKey = sebakjs.getPublicAddress(secretKey.toString(CryptoJS.enc.Utf8));

  return AppStorage.loadAccountsAsync().then((accounts) => {
    let counter = 1;

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

const getSecureKey = async (resKey, password) => {
  const rawSecretKey = AES.decrypt(resKey.slice(3), password);
  return rawSecretKey.toString(CryptoJS.enc.Utf8);
};

const createRestoreKey = async (secretKey, password) => {
  const secretSeed = `BOS${AES.encrypt(secretKey, password).toString()}`;

  return secretSeed;
};

const changeRestoreKey = async (account, prevPassword, password) => {
  const secretKey = AES.decrypt(account.secretSeed.slice(3), prevPassword);
  const secretSeed = `BOS${AES.encrypt(secretKey, password).toString()}`;

  const result = {
    name: account.name,
    address: account.address,
    secretSeed,
  };
  return result;
};

export {
  validatePassword,
  validateSecretKey,
  createAccountAsync,
  createRestoreKeyAsync,
  getPublicFromRestore,
  createRestoreKey,
  changeRestoreKey,
  getSecureKey,
};
