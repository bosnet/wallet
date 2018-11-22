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

const SelectAccountCreation = ({ settings }) => {
  const Strings = strings[settings.language].Accounts.SelectAccountCreation;

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
          text={Strings.SELECT_NORMAL}
          action={NavAction.pushScreen(NavAction.Screens.AGREEMENT)}
          borderColor={colors.transparent}
        />
        <LongButton
          text={Strings.SELECT_TESTNET}
          backgroundColor={colors.buttonWhite}
          textColor={colors.buttonTextPurple}
          action={NavAction.pushScreen(
            NavAction.Screens.AGREEMENT,
            {
              angelbotFlag: true,
            },
          )}
        />
      </View>
      <AndroidBackHandler />
    </View>
  );
};

SelectAccountCreation.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  settings: state.settings,
});

export default connect(mapStateToProps)(SelectAccountCreation);
