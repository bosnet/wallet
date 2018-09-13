import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from '../styles';
import arrow from '../../../resources/images/arrow.png';

const DefaultItem = ({ text }) => (
  <TouchableOpacity
    style={styles.listItem}
  >
    <Text style={styles.itemText}>
      {text}
    </Text>
    <Image style={styles.itemArrow} source={arrow} />
  </TouchableOpacity>
);

DefaultItem.propTypes = {
  text: PropTypes.string.isRequired,
};

export default DefaultItem;
