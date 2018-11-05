const Accounts = {
  Precaution: {
    TITLE: 'Precautions',
    PRECAUTION_1: 'You need a minimum balance of 0.1 BOS to make your account valid.\nPlease deposit minimum balance of 0.1 BOS to activate your account',
    PRECAUTION_2: 'Information in the account will be lost when the app is deleted or when you import the account',
    PRECAUTION_3: 'Password is required for transferring BOScoin, Secret Seed inquiry, and account importing\nDO NOT lose or share your password to anyone',
    PRECAUTION_4: 'Secret Seed is required to import your account. DO NOT lose or share your Secret Seed to anyone',
    ALERT_NEED_CHECK: 'Please check all cautions',
    BACK_BUTTON: 'Close',
    BUTTON_TEXT: 'Ok',
  },
  SetPassword: {
    HEAD_TEXT: 'Please set up account password',
    TITLE: 'New password setting',
    ACTION_TEXT: 'Cancel',
    INPUT1_LABEL: 'Enter new password',
    INPUT2_LABEL: 'Re-enter new password',
    PLACEHOLDER: 'Password phrase must be longer than 8 letters include English upper & lower case, numbers and special characters',
    HELPER_DEFAULT: 'Password phrase must be longer than 8 letters include English upper & lower case, numbers and special characters',
    HELPER_ERROR_NOTEXT: 'Enter your password',
    HELPER_ERROR_NOT_VALID: 'Wrong password please check again',
    HELPER_ERROR_NOT_MATCH: 'Password incorrect',

    ALERT_PASSWORD_ERROR: 'Password phrase must be longer than 8 letters include English upper & lower case, numbers and special characters',
    ALERT_PASSWORD_SET_TITLE: 'Password setting completed',
    ALERT_PASSWORD_SET_MESSAGE: 'Remember the Recovery Key you see on the next screen in order to recover your account',

    WARNING1: '* Changing the password will remove the existing Recovery Key.',
    WARNING2: '* You can find new Recovery Key in settings.',

    BUTTON_TEXT: 'Ok',

    TOAST_DUPLICATED_ADDRESS: 'This Public Address registered already',
    TOAST_ADDRESS_NOT_VALID: 'Incorrect Public Address',
    TOAST_SS_NOT_VALID: 'Secret Seed is invalid',
  },
  ImportAccount: {
    TITLE: 'Import account',
    BACK_BUTTON: 'Cancel',
    IMPORT_SS_MESSAGE: 'Please enter account\'s secret seed',
    IMPORT_RK_MESSAGE: 'Please enter accounts recovery key',
    IMPORT_SS_LABEL: 'Secret seed',
    IMPORT_RK_LABEL: 'Recovery key',
    PASSWORD_LABEL: 'Enter account password',

    PLACEHOLDER_SECURE: 'Enter the Secret Seed start with letter \'S\'.',
    HELPER_DEFAULT_SECURE: 'Enter your Secret Seed start with letter \'S\'',
    HELPER_ERROR_NO_SECURE: 'Enter your secret seed',
    HELPER_ERROR_NOT_VALID: 'Secret Seed is invalid',
    TOAST_SS_NOT_VALID: 'Secret Seed is invalid',

    PLACEHOLDER_RESTORE: 'Enter the recovery yey start with letter \'B\'',
    HELPER_DEFAULT_RESTORE: 'enter your recovery yey start with letter \'B\'',
    HELPER_ERROR_NO_RESTORE: 'Recovery Key is needed to recover your account',
    HELPER_ERROR_NOT_VALID_RESTORE: 'Recovery Key is invalid',
    TOAST_RK_NOT_VALID: 'Recovery Key is invalid',

    PLACEHOLDER_RES_PASSWORD: 'Enter account password',
    HELPER_DEFAULT_RES_PASSWORD: 'Password phrase must be longer than 8 letters include English upper & lower case , numbers and special characters',
    HELPER_ERROR_NO_RES_PASSWORD: 'Please enter your password',
    HELPER_ERROR_NOT_VALID_RES_PASSWORD: 'Wrong password please check again',

    TOAST_DUPLICATED_ADDRESS: 'This account setted up already.',

    NOTICE1_RK: '* Password belongs to you only.',
    NOTICE1_SS: '* Secret Seed belongs to you only.',
    NOTICE2: '* You can not import your account when you lose the password . \n So please use \' restore account using with the Secret Seed\' menu.',
    NOTICE2_SS: '* You can not import your account when you lose the Secret Seed . \n So please use \' restore account using with the Recovery Key\' menu.',

    BUTTON_TEXT: 'Ok',
    BUTTON_NEXT: 'Next',
  },
  ChangeAccountName: {
    TITLE: 'Account\'s name change',
    HEAD_TEXT: 'Please register this account\'s name',
    BACK_BUTTON: 'Cancel',

    INPUT_LABEL: 'Enter account name',
    INPUT_PLACEHOLDER: 'Please enter account name',
    HELPER_DEFAULT: 'Account\'s name has to be more than 1 letter but less than 10 letters',
    HELPER_ERROR_NO_INPUT: 'Please enter at least one character and no more than ten character for the name of the account',
    HELPER_ERROR_DUPLICATE_NAME: 'This name is already in used',

    NOTICE: '* If you remove BOS wallet or move wallet information to another cell-phone through account importing, existed name will be disappeared.',

    BOTTOM_BUTTON_TEXT: 'Ok',
  },
  AuthChangePassword: {
    modePassword: {
      TITLE: 'Password verification',
      HEAD_TEXT: 'Enter current password',

      INPUT_LABEL: 'Current password',
      INPUT_PLACEHOLDER: 'Password phrase must be longer than 8 letters include English upper & lower case, numbers and special characters',
      HELPER_DEFAULT: 'Password phrase must be longer than 8 letters include English upper & lower case, numbers and special characters',
      HELPER_NO_INPUT: 'Enter your password',
      HELPER_INVALID: 'Wrong password please check again',

      TEXT_BUTTON_LABEL: 'Verification using with Secret Seed',
    },
    modeSecure: {
      TITLE: 'Secret Seed verification',
      HEAD_TEXT: 'Enter current Secret Seed',

      INPUT_LABEL: 'Current Secret Seed',
      INPUT_PLACEHOLDER: 'Enter the Secret Seed start with letter \'S\'.',
      HELPER_DEFAULT: 'Enter your Secret Seed start with letter \'S\'',
      HELPER_NO_INPUT: 'Enter your Secret seed',
      HELPER_INVALID: 'Secret Seed is invalid',

      TEXT_BUTTON_LABEL: 'Verification using with password',
    },

    ALERT_REMOVE_OK_TITLE: 'Deleting account complete',
    ALERT_REMOVE_OK_CONTEXT: 'Deleting account complete',
    ALERT_BUTTON_OK: 'Ok',

    BACK_KEY_TEXT: 'Cancel',
    NOTICE1: '* Changing the password will remove the existing Recovery Key.',
    NOTICE2: '* You can find new Recovery Key in settings.',

    BUTTON_TEXT_OK: 'Ok',
    BUTTON_TEXT_NEXT: 'Ok',
  },
  AccountCreated: {
    SS_KEY: 'Secret Seed',
    RS_KEY: 'Recovery Key',

    TITLE: 'Backup',
    BACK_BUTTON: 'Close',
    BUTTON_SAVE: 'Save',
    BUTTON_COPY: 'Copy',

    TOAST_CLIPBOARD: 'has been copied',

    TOAST_CLIPBOARD_SS: 'Secret Seed has been copied',
    TOAST_CLIPBOARD_RK: 'Recovery Key has been copied',

    SS_TITLE: 'Backup Secret Seed',
    RK_TITLE: 'Backup Recovery Key',

    RK_HEADTEXT: 'Recovery Key starts with letter \' B\'. Please store your Recovery Key securely',
    SS_HEADTEXT: 'Secret Seed starts with letter \'S\' and 56 characters in total. Please store your Secret Seed securely',
  },
  SelectImportType: {
    TITLE: 'Select import options',
    BACK_BUTTON: 'Close',

    SELECT_SS: 'Import account using with Secret Seed',
    SELECT_RK: 'Import account using with Recovery Key',
  },
  Management: {
    TITLE: 'Setting',
    LABEL_CHANGE_NAME: 'Account\'s name change',
    LABEL_CHANGE_PASSWORD: 'Password change',
    LABEL_SHOW_SS: 'Confirm Secret Seed',
    LABEL_SHOW_RK: 'Confirm Recovery Key',
    LABEL_REMOVE_ACCOUNT: 'Delete account',

    KEYTYPE_SS: 'KEYTYPE_SS',
    KEYTYPE_RK: 'KEYTYPE_RK',
  },
  WarningKeyLeakageRestore: {
    KEYTYPE_SS: 'KEYTYPE_SS',
    KEYTYPE_RK: 'KEYTYPE_RK',

    TITLE_SS: 'Caution! Secret Seed can be leaking',
    TITLE_RK: 'Caution! Recovery Key can be leaking',
    MESSAGE_SS: 'If you lose / forgot your Secret Seed, You can lose your all digital asset. So please be aware keep your Secret Seed in secure',
    MESSAGE_RK: 'If you lose / forgot your Recovery Key, You can lose your all digital asset. So please be aware keep your Recovery Key in secure',
    NOTI_SS: '* Do not lose your Secret Seed or Recovery Key\nYou can not retrieve your account without them',
    NOTI_RK: '* If you lose / forgot your Recovery Key, You can lose your all digital asset. So please be aware keep your Recovery Key in secure',

    BUTTON_TEXT_OK: 'Ok',
  },
  ConfirmBackUp: {
    TITLE: 'Back up confirmation',
    BACK_BUTTON: 'Cancel',

    MESSAGE: 'Are you save Secret Seed, Recovery Key and password insecure?',
    NOTI: '* If you delete your account without saving them, you can not recover your account',

    BUTTON_TEXT_OK: 'Ok',
  },
  ConfirmRemove: {
    TITLE: 'Final confirmation ; Delete account',
    BACK_BUTTON: 'Cancel',

    MESSAGE: 'Are you sure you want to delete it?',

    BUTTON_TEXT_OK: 'Ok',
  },
};

export default Accounts;
