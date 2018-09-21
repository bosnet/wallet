import React from 'react';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from '../styles';
import arrow from '../../../resources/images/arrow.png';
import icExlink from '../../../resources/images/external_link.png';

const ExLinkItem = ({ text, value }) => (
  <View style={styles.listItem}>
    <Text style={styles.itemText}>
      {text}
    </Text>
    <TouchableOpacity style={styles.rowDirection}>
      <Image style={styles.exLinkIcon} source={icExlink} />
      <Image style={styles.itemArrow} source={arrow} />
    </TouchableOpacity>
  </View>
);

ExLinkItem.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default ExLinkItem;
