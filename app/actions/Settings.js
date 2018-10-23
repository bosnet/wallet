const Settings = {
  SET_SETTINGS: 'SET_SETTINGS',

  LANGUAGE_KO: 'ko',
  LANGUAGE_ENG: 'eng',
};

Settings.setSettings = params => ({
  type: Settings.SET_SETTINGS,
  params,
});

export default Settings;
