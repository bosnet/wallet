import React from 'react';
import { View } from 'react-native';

import { LeftElement, RightElement } from './partial';
import styles from '../styles';

const HomeToolbar = () => (
  <View style={styles.toolbarHome}>
    <LeftElement />
    <RightElement />
  </View>
);

export default HomeToolbar;
