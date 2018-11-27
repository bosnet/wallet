const Accounts = {
  Precaution: {
    TITLE: 'Precautions',
    PRECAUTION_1: 'You need a minimum balance of 0.1 BOS to make your account valid. Please deposit minimum balance of 0.1 BOS to activate your account.',
    PRECAUTION_2: 'Information in the account will be lost when the app is deleted or when you import the account.',
    PRECAUTION_3: 'Password is required for transferring BOScoin, Secret Seed inquiry, and account importing. DO NOT lose or share your password to anyone.',
    PRECAUTION_4: 'Secret Seed is required to import your account. DO NOT lose or share your Secret Seed to anyone.',
    ALERT_NEED_CHECK: 'Please check all cautions',
    BACK_BUTTON: 'Close',
    BUTTON_TEXT: 'OK',
  },
  SetPassword: {
    HEAD_TEXT: 'Please set up this account\'s password.',
    TITLE: 'New password setting',
    ACTION_TEXT: 'Cancel',
    INPUT1_LABEL: 'Enter new password',
    INPUT2_LABEL: 'Re-enter new password',
    PLACEHOLDER: 'Enter new password',
    PLACEHOLDER2: 'Enter confirm password',
    HELPER_DEFAULT: 'Password phrase must be longer than 8 letters include English upper & lower case, numbers and special characters.',
    HELPER_ERROR_NOTEXT: 'Enter your password.',
    HELPER_ERROR_NOT_VALID: 'Wrong password, please check again.',
    HELPER_ERROR_NOT_MATCH: 'Password incorrect.',

    ALERT_PASSWORD_ERROR: 'Password phrase must be longer than 8 letters include English upper & lower case, numbers and special characters.',
    ALERT_PASSWORD_SET_TITLE: 'Password setting completed',
    ALERT_PASSWORD_SET_MESSAGE: 'Remember the Recovery Key you see on the next screen in order to import your account.',

    WARNING1: 'Password is required for remittance, Secret Seed inquiry, and account importing.',
    WARNING2: 'DO NOT lose or share your password to anyone.',

    WARNING_CHANGE1: 'Password is required for remittance, Secret Seed inquiry, and account importing',

    BUTTON_TEXT: 'OK',

    TOAST_DUPLICATED_ADDRESS: 'This Public Address registered already',
    TOAST_ADDRESS_NOT_VALID: 'Incorrect Public Address',
    TOAST_SS_NOT_VALID: 'Secret Seed is invalid',
    TOAST_ANGELBOT_FAILED: 'Account creation failed, please try again.',
  },
  ImportAccount: {
    TITLE: 'Import account',
    BACK_BUTTON: 'Cancel',
    IMPORT_SS_MESSAGE: 'Please enter account\'s Secret Seed.',
    IMPORT_RK_MESSAGE: 'Please enter accounts\'s Recovery Key.',
    IMPORT_SS_LABEL: 'Secret Seed',
    IMPORT_RK_LABEL: 'Recovery Key',
    PASSWORD_LABEL: 'Enter account password',

    PLACEHOLDER_SECURE: 'Enter Secret Seed',
    HELPER_DEFAULT_SECURE: 'Enter your Secret Seed start with letter \'S\'.',
    HELPER_ERROR_NO_SECURE: 'Enter your Secret Seed.',
    HELPER_ERROR_NOT_VALID: 'Secret Seed is invalid.',
    TOAST_SS_NOT_VALID: 'Secret Seed is invalid',

    PLACEHOLDER_RESTORE: 'Enter Recovery Key',
    HELPER_DEFAULT_RESTORE: 'Enter your recovery key start with letter \'B\'.',
    HELPER_ERROR_NO_RESTORE: 'Recovery Key is needed to import your account.',
    HELPER_ERROR_NOT_VALID_RESTORE: 'Please check Recovery key or password again.',
    TOAST_RK_NOT_VALID: 'Please check Recovery key or password again',

    PLACEHOLDER_RES_PASSWORD: 'Enter current password',
    HELPER_DEFAULT_RES_PASSWORD: 'Password phrase must be longer than 8 letters include English upper & lower case, numbers and special characters.',
    HELPER_ERROR_NO_RES_PASSWORD: 'Please enter your password.',
    HELPER_ERROR_NOT_VALID_RES_PASSWORD: 'Wrong password, please check again.',

    TOAST_DUPLICATED_ADDRESS: 'This account setted up already',

    NOTICE1_RK: 'Password belongs to you only.',
    NOTICE2_RK: 'You can not import your account when you lose the Recovery Key. So please use \'Import account using with the Secret Key\' menu.',
    NOTICE1_SS: 'Secret Seed belongs to you only',
    NOTICE2: 'You can not import your account when you lose the Recovery Key. So please use \'Import account using with the Secret Key\' menu',
    NOTICE2_SS: 'You can not import your account when you lose the Secret Seed. So please use \'Import account using with the Recovery Key\' menu',

    BUTTON_TEXT: 'OK',
    BUTTON_NEXT: 'Next',
  },
  ChangeAccountName: {
    TITLE: 'Change Name',
    HEAD_TEXT: 'Please register this account\'s name.',
    BACK_BUTTON: 'Cancel',

    INPUT_LABEL: 'Enter account name',
    INPUT_PLACEHOLDER: 'Please enter account name',
    HELPER_DEFAULT: 'Account\'s name has to be more than 1 letter but less than 10 letters.',
    HELPER_ERROR_NO_INPUT: 'Please enter at least one character and no more than ten character for the name of the account.',
    HELPER_ERROR_INVALID_NAME: 'This field contains unsupported text.',
    HELPER_ERROR_DUPLICATE_NAME: 'This name is already in used.',

    NOTICE: 'If you remove BOScoin Wallet or move wallet information to another cell-phone through account importing, existed name will be disappeared.',

    BOTTOM_BUTTON_TEXT: 'OK',
  },
  AuthChangePassword: {
    modePassword: {
      TITLE: 'Password verification',
      HEAD_TEXT: 'Enter current password.',

      INPUT_LABEL: 'Current password',
      INPUT_PLACEHOLDER: 'Enter password',
      HELPER_DEFAULT: 'Password phrase must be longer than 8 letters include English upper & lower case, numbers and special characters.',
      HELPER_NO_INPUT: 'Enter your password.',
      HELPER_INVALID: 'Wrong password, please check again.',

      TEXT_BUTTON_LABEL: 'Verification Secret Seed',
    },
    modeSecure: {
      TITLE: 'Secret Seed verification',
      HEAD_TEXT: 'Enter current Secret Seed.',

      INPUT_LABEL: 'Current Secret Seed',
      INPUT_PLACEHOLDER: 'Enter Secret Seed',
      HELPER_DEFAULT: 'Enter your Secret Seed start with letter \'S\'.',
      HELPER_NO_INPUT: 'Enter your Secret Seed.',
      HELPER_INVALID: 'Secret Seed is invalid.',

      TEXT_BUTTON_LABEL: 'Verification using with password',
    },

    ALERT_REMOVE_OK_TITLE: 'Account deleted',
    ALERT_REMOVE_OK_CONTEXT: 'Your account has been deleted.',
    ALERT_BUTTON_OK: 'OK',

    BACK_KEY_TEXT: 'Cancel',
    NOTICE1: 'Password belongs to you only',
    NOTICE2: 'You can find new Recovery Key in settings',

    NOTICE_CHANGE1: 'Changing the password will remove the existing Recovery Key.',
    NOTICE_CHANGE2: 'You can find new Recovery Key in settings.',

    BUTTON_TEXT_OK: 'OK',
    BUTTON_TEXT_NEXT: 'OK',
  },
  AccountCreated: {
    SS_KEY: 'Secret Seed',
    RS_KEY: 'Recovery Key',

    TITLE: 'Backup',
    BACK_BUTTON: 'Close',
    BUTTON_SAVE: 'Save',
    BUTTON_COPY: 'Copy',

    PUBLIC_ADDRESS: 'Public Address',

    TOAST_CLIPBOARD: 'has been copied',

    TOAST_CLIPBOARD_SS: 'Copied to clipboard',
    TOAST_CLIPBOARD_RK: 'Copied to clipboard',

    SS_TITLE: 'Confirm Secret Seed',
    RK_TITLE: 'Confirm Recovery Key',

    RK_HEADTEXT: 'Recovery Key starts with letter \'B\'.\nPlease store your Recovery Key securely.',
    SS_HEADTEXT: 'Secret Seed starts with letter \'S\' and 56 characters in total.\nPlease store your Secret Seed securely.',
  },
  SelectImportType: {
    TITLE: 'Select import options',
    BACK_BUTTON: 'Close',

    SELECT_SS: 'Import account using with Secret Seed',
    SELECT_RK: 'Import account using with Recovery Key',
  },
  Management: {
    TITLE: 'Setting',
    LABEL_CHANGE_NAME: 'Change Name',
    LABEL_CHANGE_PASSWORD: 'Change Password',
    LABEL_SHOW_SS: 'Confirm Secret Seed',
    LABEL_SHOW_RK: 'Confirm Recovery Key',
    LABEL_REMOVE_ACCOUNT: 'Delete Account',

    KEYTYPE_SS: 'KEYTYPE_SS',
    KEYTYPE_RK: 'KEYTYPE_RK',
  },
  WarningKeyLeakageRestore: {
    KEYTYPE_SS: 'KEYTYPE_SS',
    KEYTYPE_RK: 'KEYTYPE_RK',

    TITLE_SS: 'Caution!',
    TITLE_RK: 'Caution!',
    MESSAGE_SS: 'If you lose / forgot your Secret Seed, You can lose your all digital asset. So please be aware keep your Secret Seed in secure.',
    MESSAGE_RK: 'If you lose / forgot your Recovery Key, You can lose your all digital asset. So please be aware keep your Recovery Key in secure.',
    NOTI_SS: 'Do not lose your Secret Seed or Recovery Key.',
    NOTI_RK: 'Do not lose your Recovery Key, password.',
    NOTI_SS2: 'You can not retrieve your account without them.',
    NOTI_RK2: 'Password belongs to you only, You can not retrieve your account without them.',

    BUTTON_TEXT_OK: 'OK',
  },
  ConfirmBackUp: {
    TITLE: 'Back up confirmation',
    BACK_BUTTON: 'Cancel',

    MESSAGE: 'Are you save Secret Seed, Recovery Key and password insecure?',
    NOTI: 'If you delete your account without saving them, you can not recover your account.',

    BUTTON_TEXT_OK: 'OK',
  },
  ConfirmRemove: {
    TITLE: 'Final confirmation',
    BACK_BUTTON: 'Cancel',

    MESSAGE: 'Are you sure you want to delete it?',

    BUTTON_TEXT_OK: 'OK',
  },
  SelectAccountCreation: {
    TITLE: 'Select an option',
    BACK_BUTTON: 'Close',

    SELECT_NORMAL: 'Creat new account',
    SELECT_TESTNET: 'Creat new account on Testnet',
  },
};

export default Accounts;
