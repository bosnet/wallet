import React from 'react';
import { Text, View } from 'react-native';

import styles from '../styles';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';

const SettingsScreen = () => (
  <View style={styles.container}>
    <AppStatusBar theme={StatusBarTheme.WHITE} />
    <DefaultToolbar
      theme={DefaultToolbarTheme.WHITE}
      data={{
        left: {
          hasArrow: true,
          title: '설정',
        },
      }}
    />
    <View>
      <Text>Welcome to React Native!</Text>
      <Text>To get started, edit SettingsScreen</Text>
    </View>
  </View>
);

SettingsScreen.navigationOptions = {
  header: null,
};

export default SettingsScreen;
