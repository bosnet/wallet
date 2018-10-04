import { Keypair } from '@pigzbe/react-native-stellar-sdk';
import { AES } from 'crypto-js';

import AppStorage from './AppStorage';

const checkName = (element, accountName) => element.name === accountName;

const checkAddress = (element, accountAddr) => element.address === accountAddr;


const createAccountAsync = password => Keypair.randomAsync().then(
  (keypair) => {
    const publicKey = keypair.publicKey();
    const secretKey = keypair.secret();

    return AppStorage.loadAccountsAsync().then((accounts) => {
      let counter = 1;

      // Account Name 자동 설정
      const accountName = `Account ${counter}`;
      if (accounts && accounts.isArray()) {
        while (accounts.findIndex(checkName) > -1) {
          counter += 1;
        }
      }

      // SecretSeed 설정
      const secretSeed = AES.encrypt(secretKey, password).toString();
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

const getPublicFromSecure = (secure) => {
  const keypair = Keypair.fromSecret(secure);
  const publicKey = keypair.publicKey();

  return publicKey;
};

const getPublicFromRestore = (restore) => {

};

export { createAccountAsync };
