import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';
import strings from '../../resources/strings';

import { Navigation as NavAction } from '../../actions';
import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { LongButton } from '../../components/Button';
import { colors } from '../../resources';
import AndroidBackHandler from '../../AndroidBackHandler';

const SelectImportType = ({ settings }) => {
  const Strings = strings[settings.language].Accounts.SelectImportType;

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
      <View style={styles.centerLayout}>
        <LongButton
          text={Strings.SELECT_SS}
          action={NavAction.pushScreen(NavAction.Screens.IMPORT_BY_SECURE)}
        />
        <LongButton
          text={Strings.SELECT_RK}
          backgroundColor={colors.buttonWhite}
          textColor={colors.buttonTextPurple}
          action={NavAction.pushScreen(NavAction.Screens.IMPORT_BY_RESTORE)}
        />
      </View>
      <AndroidBackHandler />
    </View>
  );
};

SelectImportType.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  settings: state.settings,
});

export default connect(mapStateToProps)(SelectImportType);
