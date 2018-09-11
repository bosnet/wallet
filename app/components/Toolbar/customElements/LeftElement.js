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
    <TouchableOpacity style={styles.ToolbarButton}>
      <Image style={styles.WhiteToolbarBack} source={backChevron} />
    </TouchableOpacity>
  </View>
);

export default LeftElement;
