const Accounts = {
  ADD_ACCOUNTS: 'ADD_ACCOUNTS',
  LOAD_ACCOUNTS: 'LOAD_ACCOUNTS',
};

Accounts.addAccount = account => ({
  type: Accounts.ADD_ACCOUNTS,
  account,
});

Accounts.loadAccounts = accounts => ({
  type: Accounts.LOAD_ACCOUNTS,
  list: accounts,
});

export default Accounts;
