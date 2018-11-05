import React from 'react';
import { View, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';
import { types } from '../../resources';
import strings from '../../resources/strings';

import { Navigation as NavAction, Settings as SettingAction } from '../../actions';
import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { ItemList } from '../../components/List';

import AppStorage from '../../libs/AppStorage';
import AndroidBackHandler from '../../AndroidBackHandler';

const SelectLanguage = ({ settings, doAction }) => {
  const Strings = strings[settings.language].Settings.SelectLanguage;

  return (
    <View style={styles.container}>
      <AppStatusBar theme={StatusBarTheme.PURPLE} />
      <DefaultToolbar
        theme={DefaultToolbarTheme.PURPLE}
        data={{
          center: {
            title: Strings.TITLE,
          },
          right: {
            actionText: Strings.BACK_BUTTON,
            action: NavAction.popScreen(),
          },
        }}
      />
      <View style={styles.defaultLayout}>
        <ItemList
          listType={types.ListType.FLAT}
          listData={{
            data: [
              {
                key: Strings.OPTION_ENG,
                onPress: () => {
                  doAction(
                    SettingAction.setSettings({
                      language: SettingAction.LANGUAGE_ENG,
                    }),
                  );
  
                  AppStorage.saveSettingsAsync({
                    ...settings,
                    language: SettingAction.LANGUAGE_ENG,
                  })
                    .then(() => {
                      doAction(NavAction.popScreen());
                    });
                },
              },
              {
                key: Strings.OPTION_KOR,
                onPress: () => {
                  doAction(
                    SettingAction.setSettings({
                      language: SettingAction.LANGUAGE_KO,
                    }),
                  );
  
                  AppStorage.saveSettingsAsync({
                    ...settings,
                    language: SettingAction.LANGUAGE_KO,
                  })
                    .then(() => {
                      doAction(NavAction.popScreen());
                    });
                },
              },
            ],
          }}
        />
      </View>
      <AndroidBackHandler />
    </View>
  );
};

SelectLanguage.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  doAction: async action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectLanguage);
