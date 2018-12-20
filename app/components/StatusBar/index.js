import React from 'react';
import { StatusBar, Platform, View} from 'react-native';
import PropTypes from 'prop-types';

import { colors } from '../../resources';

const Theme = {
  WHITE: 'white',
  PURPLE: 'purple',
};

const StatusBarStyle = {
  purple: {
    backgroundColor: colors.toolbarPurple,
    barStyle: 'light-content',
  },
  white: {
    backgroundColor: colors.toolbarWhite,
    barStyle: 'dark-content',
  },
};

const AppStatusBar = ({ theme }) => {
  if (Platform.OS === 'ios') {
    return (
      <View
        style={{
          height: 30,
          backgroundColor: StatusBarStyle[theme].backgroundColor,
        }}
      >
          <StatusBar
            backgroundColor={StatusBarStyle[theme].backgroundColor}
            barStyle={StatusBarStyle[theme].barStyle}
          />
      </View>
    )
  } 

  return (
    <StatusBar
      backgroundColor={StatusBarStyle[theme].backgroundColor}
      barStyle={StatusBarStyle[theme].barStyle}
    />
  )
};

AppStatusBar.propTypes = {
  theme: PropTypes.string.isRequired,
};

export { AppStatusBar, Theme };
