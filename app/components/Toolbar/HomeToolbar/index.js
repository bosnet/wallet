import React from 'react';
import { View } from 'react-native';

import { LeftElement, RightElement } from './partial';
import styles from '../styles';

import iconAdd from '../../../resources/images/icon-add.png';
import iconIn from '../../../resources/images/icon-in.png';
import iconSettings from '../../../resources/images/icon-setting.png';

const HomeToolbar = () => (
  <View style={styles.toolbarHome}>
    <LeftElement />
    <RightElement />
  </View>
);

export default HomeToolbar;
