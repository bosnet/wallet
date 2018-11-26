const Transactions = {
  TransactionList: {
    ACTION_SETTING: 'Setting',
    BUTTON_SEND: 'Send',
    BUTTON_RECEIVE: 'Receive',

    LABEL_CREATED: 'Create account',

    TOAST_ON_DELAY: 'Loading... Please wait a minute',

    INVALID_ACCOUNT_NOTI: 'You need a minimum balance of\n0.1 BOS to make your account valid.\nPlease deposit minimum balance of\n0.1 BOS to activate your account.',
    INVALID_ACCOUNT_BUTTON: 'Receive 0.1 BOS',

    TOAST_ACCOUNT_NOT_AVAILABLE: 'This account is not valid. Please activate your account\n(minimum balance of 0.1 BOS)',
  },
  SendBalance: {
    TITLE: 'Send',
    BACK_BUTTON: 'Close',

    WITHDRAWABLE_LABEL: 'Withdrawal available',
    BALANCE_INPUT_LABEL: 'Amount',
    BALANCE_INPUT_PLACEHOLDER: '0.0000000',
    HELPER_BALANCE_DEFAULT: 'Please enter transferred amount.',
    HELPER_BALANCE_ERROR_NO_INPUT: 'Please enter transferred amount.',
    HELPER_BALANCE_ERROR_NOT_VALID: 'Amount is invalid.',
    HELPER_BALANCE_ERROR_RANGE: 'Please enter transferred amount less than withdrawal available.',
    HELPER_BALANCE_ERROR_DOT_RANGE: 'You can enter up to 7 decimal place.',

    ADDRESS_INPUT_LABEL: 'Enter Public Address',
    ADDRESS_INPUT_PLACEHOLDER: 'Enter Public Address',
    HELPER_ADDRESS_DEFAULT: 'Enter Public Address.',
    HELPER_ADDRESS_ERROR_NO_INPUT: 'Enter Public Address.',
    HELPER_ADDRESS_ERROR_NOT_VALID: 'This Public Address is invalid.',

    LABEL_FEE: 'Transaction fee',

    BUTTON_TEXT_OK: 'OK',
  },
  SelectWithdraw: {
    TITLE: 'Withdrawal account',
    NOTI_NO_ADDRESS: 'There are no valid withdrawal accounts.',
    BACK_BUTTON: 'Cancel',
    BUTTON_TEXT_OK: 'Select',
  },
  TransactionDetail: {
    TITLE: 'Transaction details',
    LABEL_SENDER: 'Withdrawal account',
    LABEL_RECEIVED_AMOUNT: 'Received amount',
    BACK_BUTTON: 'Close',

    LABEL_RECEIVER: 'Receive account',
    LABEL_SEND_AMOUNT: 'Sent amount',

    LABEL_FEE: 'Transaction fee',
    LABEL_TOTAL: 'Total amount',

    LABEL_DATE: 'Transaction time',
    LABEL_TYPE: 'Transaction type',
    TYPE_SEND: 'Withdrawal',
    TYPE_RECV: 'Deposit',
    LABEL_TRANSACTION_ID: 'Transaction ID',

    BUTTON_TEXT_OK: 'OK',
    BUTTON_TEXT_EXPLORER: 'Explorer',

    TOAST_CLIPBOARD: 'Copied to clipboard',
  },
  BeforeTransaction: {
    TITLE: 'Transfer details',
    HEAD_TEXT: 'Please check transfer details below.',
    LABEL_RECEIVER: 'Received account\'s Public Address',
    LABEL_AMOUNT: 'Amount',
    LABEL_FEE: 'Transaction fee',
    LABEL_TOTAL: 'Total amount',

    BUTTON_TEXT_YES: 'Yes',
    BUTTON_TEXT_NO: 'No',
  },
  ReceiveBalance: {
    TITLE: 'Receive',
    BACK_BUTTON: 'Close',
    PUBLIC_ADDRESS: 'Public Address',

    BUTTON_TEXT_SHARE: 'Share',
    BUTTON_TEXT_COPY: 'Copy',

    TOAST_CLIPBOARD: 'Copied to clipboard',
  },
  ReceiveAccount: {
    TITLE: 'Receiving account',
    BACK_BUTTON: 'Cancel',

    TAB1_TITLE: 'My accounts',
    TAB2_TITLE: 'Contacts',
    TAB3_TITLE: 'Direct input',

    // TAB 1
    MyAccounts: {
      NOTI_NO_ADDRESS: 'My account is nonexistent.',
      BUTTON_TEXT_SELECT: 'Select',
    },

    // TAB 2
    AddressBook: {
      NOTI_NO_ADDRESS: 'Accounts not register yet.',
      BUTTON_TEXT_SELECT: 'Select',
    },

    // TAB 3
    InputAccounts: {
      NO_RECENT_ADDRESS: 'Latest transfer record not exists',
      BUTTON_TEXT_SELECT: 'Select',
      INPUT_PLACEHOLDER: 'Enter Public Address',

      HELPER_ADDRESS_DEFAULT: 'Please enter Public Address start with letter \'G\' and its length is 56 letters long.',
      HELPER_ADDRESS_ERROR_NO_INPUT: 'Enter Public Address.',
      HELPER_ADDRESS_ERROR_NOT_VALID: 'Incorrect Public Address.',

      LABEL_PUBLIC_ADDRESS: 'Public Address',
      LABEL_RECENT_SENT: 'Latest transfer record',

      TOAST_NO_ADDRESS: 'Please choose receiving account',
    },
  },

  CreateTransaction: {
    TITLE: 'Transaction completed',

    HEAD_TEXT_TRANSACTION_OK: 'Transaction is created.',
    HEAD_TEXT_TRANSACTION_FAIL: 'You transaction request has been failed.\nPlease try again.',

    BUTTON_TEXT_OK: 'OK',
    BUTTON_TEXT_ADD: 'Add contact',

    LABEL_TFAIL: 'Transaction results',
    LABEL_FAIL_PREFIX: 'Transaction failed -',

    LABEL_ADDR: 'Received account\'s Public Address',
    LABEL_AMOUNT: 'Amount',
    LABEL_FAILED_AMOUNT: 'Transfer failure amount',
    LABEL_FEE: 'Transaction fee',
    LABEL_TOTAL: 'Total amount',
  },
};

export default Transactions;
