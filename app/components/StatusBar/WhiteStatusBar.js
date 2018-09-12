import React from 'react';
import { StatusBar } from 'react-native';
import { colors } from '../../res/index';

const WhiteStatusBar = () => (
  <StatusBar
    backgroundColor={colors.toolbarWhite}
    barStyle="dark-content"
  />
);

export default WhiteStatusBar;
