const Navigation = {
  Screens: {
    WALKTHROUGH: 'Walkthrough',
    HOME: 'Home',
    SETTINGS: 'Settings',
    MEMBERSHIP: 'Membership',
    SORT_ACCOUNTS: 'SortAccounts',
    WARNING: 'Warning',
    TRANSACTION_MANAGE: 'TransactionManage',
    CONFIRM_REMOVE: 'ConfirmRemove',
    CONFIRM_BACKUP: 'ConfirmBackup',
    WARNING_KEY_LEAKAGE: 'WarningKeyLeakage',
    WARNING_QUIT_MEMBERSHIP: 'WarningQuitMembership',
    ADDRESSBOOK: 'AddressBook',
    MODIFY_ADDRESS: 'ModifyAddress',
    RECEIVE_BALANCE: 'ReceiveBalance',
    AUTH_CHANGE_PASSWORD: 'AuthChangePassword',
    SET_PASSWORD: 'SetPassword',
    REFERRER: 'Referrer',
    SELECT_IMPORT_TYPE: 'SelectImportType',
    IMPORT_ACCOUNT: 'ImportAccount',
    QR_SCAN: 'QRScan',
    CREATE_TRANSACTION: 'CreateTransaction',
    SELECT_RECEIVE_ACCOUNT: 'SelectReceiveAccount',
    TRANSACTION_DETAIL: 'TransactionDetail',
    SEND_BALANCE: 'SendBalance',
    JOIN_MEMBERSHIP: 'JoinMembership',
  },
  NAV_PUSH: 'NAV_PUSH',
  NAV_POP: 'NAV_POP',
};

Navigation.pushScreen = screenName => ({
  type: 'NAV_PUSH',
  routeName: screenName,
});

Navigation.popScreen = () => ({
  type: Navigation.NAV_POP,
});


export default Navigation;
