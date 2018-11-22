const Settings = {
  SET_SETTINGS: 'SET_SETTINGS',
  SET_FIREBASE: 'SET_FIREBASE',
  SET_SEBAK_CONFIG: 'SET_SEBAK_CONFIG',

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

Settings.setSebakConfig = (sebakURL, NID, angelURL) => ({
  type: Settings.SET_SEBAK_CONFIG,
  sebakURL,
  NID,
  angelURL,
});


export default Settings;
