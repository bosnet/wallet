import { Keypair } from '@pigzbe/react-native-stellar-sdk';

import AppStorage from './AppStorage';

const checkName = (element, accountName) => {
  return element.name === accountName;
};


const createAccount = () => Keypair.randomAsync().then(
  (keypair) => {
    const publicKey = keypair.publicKey();
    const secretKey = keypair.secret();

    return AppStorage.getAccounts().then((accounts) => {
      let counter = 1;
      const accountName = `Account ${counter}`;

      if (accounts && accounts.isArray()) {
        while (accounts.findIndex(checkName) > -1) {
          counter += 1;
        }
      }

      return {
        name: accountName,
        publicKey,
        secretSeed: secretKey,
      };
    });
  },
);

export { createAccount };
