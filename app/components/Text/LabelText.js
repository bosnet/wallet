import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import { colors } from '../../resources';

const labelText = ({
  text,
  color,
  bold,
  children,
}) => (
  <View style={styles.label}>
    <Text style={[styles.labelText, { color }, bold ? styles.labelTextbold : null]}>{text}</Text>
    {children}
  </View>
);

labelText.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  color: PropTypes.string,
  bold: PropTypes.bool,
  children: PropTypes.element,
};

labelText.defaultProps = {
  bold: null,
  color: colors.labelTextBlack,
  children: null,
};

export default labelText;
