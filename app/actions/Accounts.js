const Accounts = {
  SET_ACCOUNTS: 'SET_ACCOUNTS',
  Accounts_HIDE: 'Accounts_HIDE',
};

Accounts.setAccounts = accounts => ({
  type: Accounts.SET_ACCOUNTS,
  accounts,
});

export default Accounts;
