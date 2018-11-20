import React from 'react';
import { View, Image } from 'react-native';

import styles from '../../styles';
import logo from '../../../../resources/images/boscoinwallet_test.png';

const LeftElement = () => (
  <View style={styles.toolbarElement}>
    <Image style={styles.logoImageTest} source={logo} />
  </View>
);

export default LeftElement;
