import React from 'react';
import { View } from 'react-native';

import { CenterElement, RightElement } from './partial';
import styles from '../styles';

const DefaultToolbar = () => (
  <View style={styles.toolbarHome}>
    <CenterElement />
    <RightElement />
  </View>
);

export default DefaultToolbar;
