import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';
import strings from '../../resources/strings';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { InfoPager } from '../../components/Pager';
import { BottomButton } from '../../components/Button';
import { Navigation as NavAction } from '../../actions';

import icKeep from '../../resources/images/ic_keep.png';
import icCare from '../../resources/images/ic_care.png';
import AndroidBackHandler from '../../AndroidBackHandler';

const WarningScreen = ({ settings }) => {
  const Strings = strings[settings.language].Settings.Warning;

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
        <InfoPager
          data={[
            {
              headText: Strings.HEAD_TEXT1,
              image: icKeep,
              size: {
                width: 116,
                height: 121,
              },
              contentText: Strings.CONTEXT1,
            },
            {
              headText: Strings.HEAD_TEXT2,
              image: icCare,
              size: {
                width: 120,
                height: 126,
              },
              contentText: Strings.CONTEXT2,
            },
          ]}
        />
      </View>
      <BottomButton
        actions={[
          {
            text: Strings.BUTTON_TEXT_OK,
            action: NavAction.popScreen(),
          },
        ]}
      />
      <AndroidBackHandler />
    </View>
  );
};

WarningScreen.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  settings: state.settings,
});

export default connect(mapStateToProps)(WarningScreen);
