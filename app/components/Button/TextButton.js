import React from 'react';
import {
  TouchableOpacity, Text,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const TextButton = ({ text, callback }) => (
  <TouchableOpacity
    style={styles.textButton}
    onPress={() => {
      if (callback) callback();
    }}
  >
    <Text style={styles.textButtonContent}>{text}</Text>
  </TouchableOpacity>
);

TextButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TextButton;
