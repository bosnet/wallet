import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import styles from '../../styles';
import IconAdd from '../../../../resources/images/icon-add.png';
import IconIn from '../../../../resources/images/icon-in.png';
import IconSettings from '../../../../resources/images/icon-setting.png';

const RightElement = () => (
  <View style={styles.toolbarElement}>
    <View style={styles.actionGroup}>
      <TouchableOpacity style={styles.actionIcon}>
        <Image style={styles.Icon} source={IconAdd} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionIcon}>
        <Image style={styles.IconIn} source={IconIn} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionIcon}>
        <Image style={styles.Icon} source={IconSettings} />
      </TouchableOpacity>
    </View>
  </View>
);

export default RightElement;
