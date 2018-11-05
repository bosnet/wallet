const Settings = {
  SET_SETTINGS: 'SET_SETTINGS',
  SET_FIREBASE: 'SET_FIREBASE',

  LANGUAGE_KO: 'ko',
  LANGUAGE_ENG: 'eng',
};

Settings.setSettings = params => ({
  type: Settings.SET_SETTINGS,
  params,
});

Settings.setFirebase = value => ({
  type: Settings.SET_FIREBASE,
  value,
});

export default Settings;
