import React from 'react';
import {
  TouchableOpacity, Text,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const TextButton = ({ text }) => (
  <TouchableOpacity style={styles.textButton}>
    <Text style={styles.textButtonContent}>{text}</Text>
  </TouchableOpacity>
);

TextButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TextButton;
