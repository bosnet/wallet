import React from 'react';
import {
  View, Text,
} from 'react-native';
import PropTypes from 'prop-types';

import { ToggleButton } from '../../Button';

import styles from '../styles';

const ToggleItem = ({ text }) => (
  <View style={styles.listItem}>
    <Text style={styles.itemText}>
      {text}
    </Text>
    <ToggleButton />
  </View>
);

ToggleItem.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ToggleItem;
