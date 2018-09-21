import React from 'react';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from '../styles';
import arrow from '../../../resources/images/arrow.png';

const OptionTextItem = ({ text, value }) => (
  <View style={styles.listItem}>
    <Text style={styles.itemText}>
      {text}
    </Text>
    <TouchableOpacity style={styles.rowDirection}>
      <Text style={styles.optionTextItemData}>
        {value}
      </Text>
      <Image style={styles.itemArrow} source={arrow} />
    </TouchableOpacity>
  </View>
);

OptionTextItem.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default OptionTextItem;
