import React from 'react';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from '../styles';
import arrow from '../../../res/images/arrow.png';

const TextItem = ({ item, text }) => (
  <TouchableOpacity style={styles.listItem}>
    <Text style={styles.itemText}>
      {item}
    </Text>
    <View style={styles.rowDirection}>
      <Text style={styles.textItemData}>
        {text}
      </Text>
      <Image style={styles.itemArrow} source={arrow} />
    </View>
  </TouchableOpacity>
);

TextItem.propTypes = {
  item: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default TextItem;
