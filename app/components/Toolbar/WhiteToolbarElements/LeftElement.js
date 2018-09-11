import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import styles from '../styles';
import backChevron from '../../../res/images/back_chevron.png';

const LeftElement = () => (
  <View>
    <TouchableOpacity>
      <Image style={styles.whiteToolbarBack} source={backChevron} />
    </TouchableOpacity>
  </View>
);

export default LeftElement;
