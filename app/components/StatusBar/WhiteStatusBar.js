import React from 'react';
import { StatusBar } from 'react-native';
import colors from '../../res/colors';

const WhiteStatusBar = () => (
  <StatusBar
    backgroundColor={colors.white}
    barStyle="dark-content"
  />
);

export default WhiteStatusBar;
