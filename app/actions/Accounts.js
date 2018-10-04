const Accounts = {
  ADD_ACCOUNTS: 'ADD_ACCOUNTS',
  LOAD_ACCOUNTS: 'LOAD_ACCOUNTS',
};

Accounts.addAccount = account => ({
  type: Accounts.ADD_ACCOUNTS,
  account,
});

Accounts.loadAccounts = () => ({
  type: Accounts.LOAD_ACCOUNTS,
});

export default Accounts;
