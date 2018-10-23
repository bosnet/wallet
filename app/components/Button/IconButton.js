import React from 'react';
import {
  TouchableOpacity, Text, Image,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const IconButton = ({ icon, label, callback }) => (
  <TouchableOpacity
    style={styles.iconButton}
    onPress={() => {
      if (callback) callback();
    }}
  >
    <Image style={styles.icon} source={icon} />
    <Text style={styles.iconText}>{label}</Text>
  </TouchableOpacity>
);

IconButton.propTypes = {
  icon: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default IconButton;
