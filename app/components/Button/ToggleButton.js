import React from 'react';
import {
  TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

import toogleOn from '../../resources/images/switch_on.png';

const ToggleButton = ({ value }) => (
  <TouchableOpacity>
    <Image style={styles.toggleButton} source={toogleOn} />
  </TouchableOpacity>
);

ToggleButton.propTypes = {
  value: PropTypes.bool,
};

ToggleButton.defaultProps = {
  value: false,
};

export default ToggleButton;
