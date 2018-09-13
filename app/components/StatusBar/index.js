import React from 'react';
import { StatusBar } from 'react-native';
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

const AppStatusBar = ({ theme }) => (
  <StatusBar
    backgroundColor={StatusBarStyle[theme].backgroundColor}
    barStyle={StatusBarStyle[theme].barStyle}
  />
);

AppStatusBar.propTypes = {
  theme: PropTypes.string.isRequired,
};

export { AppStatusBar, Theme };
