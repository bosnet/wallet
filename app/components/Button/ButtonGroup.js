import React from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const ButtonGroup = ({ children }) => (
  <View style={styles.buttonGroup}>
    {children}
  </View>
);

ButtonGroup.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default ButtonGroup;
