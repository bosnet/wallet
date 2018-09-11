import React from 'react';
import { View } from 'react-native';

import CenterElement from './WhiteToolbarElements/CenterElement';
import LeftElement from './WhiteToolbarElements/LeftElement';

import styles from './styles';

const WhiteToolbar = ({ title }) => (
  <View style={styles.whiteToolbar}>
    <LeftElement />
    <CenterElement title={title} />
  </View>
);

export default WhiteToolbar;
