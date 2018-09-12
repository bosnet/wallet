import React from 'react';
import { StatusBar } from 'react-native';
import { colors } from '../../res/index';

const PurpleStatusBar = () => (
  <StatusBar
    backgroundColor={colors.toolbarPurple}
    barStyle="light-content"
  />
);

export default PurpleStatusBar;
