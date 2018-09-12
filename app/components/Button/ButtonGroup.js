import React from 'react';
import {
  View, Text,
} from 'react-native';
import PropTypes from 'prop-types';

import IconButton from './IconButton';

import styles from './styles';

const ButtonGroup = ({ children }) => (
  <View style={styles.buttonGroup}>
    {children}
  </View>
);

export default ButtonGroup;
