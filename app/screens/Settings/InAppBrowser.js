import React from 'react';
import { View, WebView } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';
import strings from '../../resources/strings';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { Navigation as NavAction } from '../../actions';
import AndroidBackHandler from '../../AndroidBackHandler';

const InAppBrowser = ({ settings, navigation }) => {
  
  const Strings = strings[settings.language].Settings.InAppBrowser;
  const uri = navigation.getParam('URI', null);

  return (
    <View style={styles.container}>
      <AppStatusBar theme={StatusBarTheme.WHITE} />
      <DefaultToolbar
        theme={DefaultToolbarTheme.WHITE_LIGHT}
        data={{
          right: {
            actionText: Strings.BACK_BUTTON,
            action: NavAction.popScreen(),
          },
        }}
      />
      <View style={styles.container}>
        <WebView
          source={{ uri }}
        />
      </View>
      <AndroidBackHandler />
    </View>
  );
};

InAppBrowser.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  settings: state.settings,
});

export default connect(mapStateToProps)(InAppBrowser);
