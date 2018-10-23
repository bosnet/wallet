import React from 'react';
import {
  View, Text, Image, TouchableOpacity, Linking,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from '../styles';
import arrow from '../../../resources/images/arrow.png';
import icExlink from '../../../resources/images/external_link.png';

const ExLinkItem = ({ text, value }) => (
  <TouchableOpacity
    style={styles.listItem}
    onPress={() => {
      Linking.openURL(value);
    }}
  >
    <Text style={styles.itemText}>
      {text}
    </Text>
    <View
      style={styles.rowDirection}
    >
      <Image style={styles.exLinkIcon} source={icExlink} />
      <Image style={styles.itemArrow} source={arrow} />
    </View>
  </TouchableOpacity>
);

ExLinkItem.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.string,
};

ExLinkItem.defaultProps = {
  value: '',
};

export default ExLinkItem;
