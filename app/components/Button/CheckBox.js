import React from 'react';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import icCheckOn from '../../resources/images/ic_check_on.png';
import icCheckOff from '../../resources/images/ic_check_off.png';

const CheckBox = ({ label }) => (
  <View style={styles.checkBox}>
    <TouchableOpacity style={styles.checkArea}>
      <Image style={styles.checkIcon} source={icCheckOff} />
    </TouchableOpacity>
    <Text style={styles.checkBoxLabel}>{label}</Text>
  </View>
);

CheckBox.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

export default CheckBox;
