import React from 'react';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from '../styles';
import toogleOn from '../../../res/images/switch_on.png';

const ToggleItem = ({ item }) => (
  <View style={styles.listItem}>
    <Text style={styles.itemText}>
      {item}
    </Text>
    <TouchableOpacity style={styles.rowDirection}>
      <Image style={styles.itemToggle} source={toogleOn} />
    </TouchableOpacity>
  </View>
);

ToggleItem.propTypes = {
  item: PropTypes.string.isRequired,
};

export default ToggleItem;
