import React from 'react';
import { StatusBar } from 'react-native';
import colors from '../../res/colors';

const PurpleStatusBar = () => (
  <StatusBar
    backgroundColor={colors.purple}
    barStyle="light-content"
  />
);

export default PurpleStatusBar;
