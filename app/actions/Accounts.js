const Accounts = {
  ADD_ACCOUNTS: 'ADD_ACCOUNTS',
  REMOVE_ACCOUNTS: 'REMOVE_ACCOUNTS',
  SET_ACCOUNTS: 'SET_ACCOUNTS',
  CHANGE_NAME: 'CHANGE_NAME',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  ADD_UPDATE_FLAG: 'ADD_UPDATE_FLAG',
  REMOVE_UPDATE_FLAG: 'REMOVE_UPDATE_FLAG',
  SET_UPDATE_FLAG: 'SET_UPDATE_FLAG',
  UNSET_UPDATE_FLAG: 'UNSET_UPDATE_FLAG',
};

Accounts.addAccount = account => ({
  type: Accounts.ADD_ACCOUNTS,
  account,
});

Accounts.removeAccount = account => ({
  type: Accounts.REMOVE_ACCOUNTS,
  account,
});

Accounts.loadAccounts = accounts => ({
  type: Accounts.SET_ACCOUNTS,
  list: accounts,
});

Accounts.changeName = (index, name) => ({
  type: Accounts.CHANGE_NAME,
  index,
  name,
});

Accounts.changePassword = (index, secretSeed) => ({
  type: Accounts.CHANGE_PASSWORD,
  index,
  secretSeed,
});

Accounts.setUpdateFlag = key => ({
  type: Accounts.SET_UPDATE_FLAG,
  key,
});

Accounts.unsetUpdateFlag = key => ({
  type: Accounts.UNSET_UPDATE_FLAG,
  key,
});

Accounts.addUpdateFlag = key => ({
  type: Accounts.ADD_UPDATE_FLAG,
  key,
});

Accounts.removeUpdateFlag = key => ({
  type: Accounts.REMOVE_UPDATE_FLAG,
  key,
});

export default Accounts;
