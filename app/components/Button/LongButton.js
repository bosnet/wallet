import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import { colors } from '../../resources';

const LongButton = ({
  text,
  backgroundColor,
  textColor,
  borderColor,
}) => (
  <View>
    <TouchableOpacity
      style={[styles.longButton, { backgroundColor: backgroundColor }, { borderColor: borderColor }]}
    >
      <Text style={[styles.longButtonText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  </View>
);


LongButton.propTypes = {
  text: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  borderColor: PropTypes.string,
};

LongButton.defaultProps = {
  backgroundColor: colors.buttonPurple,
  textColor: colors.buttonTextWhite,
  borderColor: colors.buttonPurple,
};

export default LongButton;
