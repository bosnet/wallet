import React from 'react';
import { StatusBar } from 'react-native';
import PropTypes from 'prop-types';

import { colors } from '../../resources';

const Type = {
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

const AppStatusBar = ({ type }) => (
  <StatusBar
    backgroundColor={StatusBarStyle[type].backgroundColor}
    barStyle={StatusBarStyle[type].barStyle}
  />
);

AppStatusBar.propTypes = {
  type: PropTypes.string.isRequired,
};

export { AppStatusBar, Type };
