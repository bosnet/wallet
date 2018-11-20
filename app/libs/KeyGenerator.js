import CryptoJS from 'crypto-js';
import sebakjs from 'sebakjs-util';
import bs58 from 'bs58';
import crypto from 'crypto';
import BaseX from 'base-x';

import {
  ToastAndroid,
} from 'react-native';
import Base from 'stellar-base';
import AppStorage from './AppStorage';

const { AES } = CryptoJS;

const B58 = BaseX('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
const iv = Buffer.from([0x42, 0x4F, 0x53, 0x5F, 0x43, 0x4F, 0x49, 0x4E,
  0x5F, 0x57, 0x41, 0x4C, 0x4C, 0x45, 0x54, 0x53]);

const sha256 = (data) => {
  return crypto.createHash('sha256').update(data).digest();
};

const createKey = (passphrase) => {
  return sha256(passphrase);
};

const checkName = (accountName) => {
  return (element) => {
    return element.name === accountName;
  };
};

const checkAddress = (element, accountAddr) => element.address === accountAddr;

const encryptWallet = (passphrase, seed) => {
  const cipher = crypto.createCipheriv('aes256', createKey(passphrase), iv);
  const encrypted = cipher.update(seed, 'utf8');
  return `BOS${B58.encode(Buffer.concat([encrypted, cipher.final()]))}A1`;
};

const decryptWallet = (passphrase, encoded) => {
  const rawEncoded = encoded.slice(3).slice(0, -2);
  const decipher = crypto.createDecipheriv('aes256', createKey(passphrase), iv);
  const decrypted = decipher.update(B58.decode(rawEncoded), 'binary', 'utf8');
  return decrypted + decipher.final('utf8');
};

const validatePassword = (account, password) => {
  try {
    const secretKey = decryptWallet(password, account.secretSeed);

    const publicKey = sebakjs.getPublicAddress(secretKey);
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

const checkSecretKey = (secretKey) => {
  try {
    const publicKey = sebakjs.getPublicAddress(secretKey);
    return publicKey;
  } catch (e) {
    return null;
  }
};

const checkPublicKey = (publicKey) => {
  try {
    Base.Keypair.fromPublicKey(publicKey);
    return true;
  } catch (e) {
    // console.log(e);
    return false;
  }
};

const createAccountAsync = async (password) => {
  const keypair = sebakjs.generate();

  const publicKey = keypair.address;
  const secretKey = keypair.seed;
  // SecretSeed 설정
  const secretSeed = encryptWallet(password, secretKey);

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

  const secretSeed = encryptWallet(password, secretKey);

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
  const secretKey = decryptWallet(password, resKey);
  const publicKey = sebakjs.getPublicAddress(secretKey);

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
  const secretKey = decryptWallet(password, resKey);

  return secretKey;
};

const createRestoreKey = async (secretKey, password) => {
  const secretSeed = encryptWallet(password, secretKey);

  return secretSeed;
};

const changeRestoreKey = async (account, prevPassword, password) => {
  // const secretKey = AES.decrypt(, prevPassword);
  const secretKey = decryptWallet(password, account.secretSeed);

  const secretSeed = encryptWallet(password, secretKey);

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
  checkSecretKey,
  checkPublicKey,
  decryptWallet,
  encryptWallet,
};
