const Settings = {
  CURRENT_LANGUAGE: 'English',

  SCREEN_TITLE: 'Settings',
  SECTION1_TITLE: 'Wallet setting',
  ADDRESSBOOK: 'Contacts',
  SORT_ACCOUNTS: 'Account ordering',
  LANGUAGE: 'Language',

  SECTION2_TITLE: 'Information',
  FAQ: 'FAQ',
  WARNING: 'Precautions',
  SERVICE: 'Service improvement',
  PRIVACY_POLICY: 'Privacy policy',
  LICENSE: 'Open-source license',
  VERSION: 'Version',

  Warning: {
    BACK_BUTTON: 'Close',

    HEAD_TEXT1: 'Please keep your information in secure',
    CONTEXT1: 'You can be stole all of your\ndigital asset when you forgot or share\nyour Secret Seed, Recovery Key\nand password',

    HEAD_TEXT2: 'Please be aware your information leaking',
    CONTEXT2: 'Your Secret Seed and Recovery Key\nmay be stolen\nPlease close the BOS Wallet\nnot in use',

    BUTTON_TEXT_OK: 'OK',
  },
  AddressBook: {
    TITLE: 'Contacts',
    BACK_BUTTON: 'Close',

    NOTI_NO_ADDRESS: 'Accounts not register yet',
    NOTI: 'The information you have registered\ncan not be recovered if the app is deleted\nPlease keep your information in secure',

    BUTTON_TEXT_ADD: 'Add Public Address',
  },
  SelectLanguage: {
    TITLE: 'Language',
    BACK_BUTTON: 'Close',

    OPTION_ENG: 'English',
    OPTION_KOR: '한국어',
  },
  ModifyAddress: {
    TITLE_ADD: 'Add Public Address',
    TITLE_MODIFY: 'Change contact information',
    BACK_BUTTON: 'Close',

    LABEL_NAME: 'Name',
    PLACEHOLDER_NAME: 'Enter 1 ~ 10 letters',
    HELPER_NAME: 'Please enter at least one character and no more than ten character for the name of the account',
    HELPER_ERROR_NO_NAME: 'Please enter account name',
    HELPER_ERROR_NAME_NOT_VALID: 'Please enter at least one character and no more than ten character for the name of the account',
    HELPER_ERROR_INVALID_NAME: 'This field contains unsupported text',
    HELPER_ERROR_DUPLICATE_NAME: 'This name is already in used',

    TOAST_MODIFY_ADDRESS: 'Can not edit Public Address',

    LABEL_ADDRESS: 'Public Address',
    PLACEHOLDER_ADDRESS: 'Enter Public Address start with letter \'G\'',
    HELPER_ADDRESS: 'Please enter Public Address start with letter \'G\' and\nits length is 56 letters long',
    HELPER_ERROR_NO_ADDRESS: 'Please enter put Public Address',
    HELPER_ERROR_ADDRESS_NOT_VALID: 'Incorrect Public Address',
    HELPER_ERROR_DUPLICATE_ADDRESS: 'This Public Address registered already',

    NOTI: 'The information you have registered\ncan not be recovered if the app is deleted\nPlease keep your information in secure',
    NOTI2: 'Please keep your information in secure',
    BUTTON_TEXT_OK: 'OK',
  },
  InAppBrowser: {
    TITLE: 'Open-source license',
    BACK_BUTTON: 'Close',
  },
  QRScan: {
    HEAD_TEXT: 'Place a QR code inside the viewfinder',
  },
  ServiceAgreement: {
    TITLE: 'Service improvement',
    BACK_BUTTON: 'Close',
    HEAD_TEXT: 'This information is only used to\nimprove the quality of the service\nYou can opt out if you do not want to\nparticipate',
    LABEL_FIREBASE: 'Firebase',
    TEXT_FIREBASE: 'Error information will be sent to the server automatically when the service ends abnormally, and be used in service improvement',
    NOTI_FIREBASE: 'Transfer information : device, os version, app version, error related contents',
  },
};

export default Settings;
