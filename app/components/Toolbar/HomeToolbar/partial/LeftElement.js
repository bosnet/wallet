import React from 'react';
import { View, Image } from 'react-native';

import { USE_TESTNET } from '../../../../config/AppConfig';
import styles from '../../styles';
import logo from '../../../../resources/images/boscoinwallet.png';
import logoTestnet from '../../../../resources/images/boscoinwallet_test.png';

const LeftElement = () => (
  <View style={styles.toolbarElement}>
    <Image
      style={USE_TESTNET ? styles.logoImageTest : styles.logoImage}
      source={USE_TESTNET ? logoTestnet : logo}
    />
  </View>
);

export default LeftElement;
