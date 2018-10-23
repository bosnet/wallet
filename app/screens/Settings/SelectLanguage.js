import React from 'react';
import { View, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';
import { types } from '../../resources';

import { Navigation as NavAction, Settings as SettingAction } from '../../actions';
import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { ItemList } from '../../components/List';

import AppStorage from '../../libs/AppStorage';

const SelectLanguage = ({ settings, doAction }) => (
  <View style={styles.container}>
    <AppStatusBar theme={StatusBarTheme.PURPLE} />
    <DefaultToolbar
      theme={DefaultToolbarTheme.PURPLE}
      data={{
        center: {
          title: '언어 설정',
        },
        right: {
          actionText: '닫기',
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
              key: 'English',
              onPress: () => {
                doAction(
                  SettingAction.setSettings({
                    language: SettingAction.LANGUAGE_ENG,
                  }),
                );

                AppStorage.saveSettingsAsync(settings)
                  .then(() => {
                    doAction(NavAction.popScreen());
                  });
              },
            },
            {
              key: '한국어',
              onPress: () => {
                doAction(
                  SettingAction.setSettings({
                    language: SettingAction.LANGUAGE_KO,
                  }),
                );

                AppStorage.saveSettingsAsync(settings)
                  .then(() => {
                    doAction(NavAction.popScreen());
                  });
              },
            },
          ],
        }}
      />
    </View>
  </View>
);

SelectLanguage.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectLanguage);
