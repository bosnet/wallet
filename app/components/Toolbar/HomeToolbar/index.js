import React from 'react';
import { View } from 'react-native';

import { LeftElement, RightElement } from './partial';
import styles from '../styles';

const HomeToolbar = ({ redrawCallback }) => (
  <View style={styles.toolbarHome}>
    <LeftElement />
    <RightElement
      redrawCallback={redrawCallback}
    />
  </View>
);

export default HomeToolbar;
