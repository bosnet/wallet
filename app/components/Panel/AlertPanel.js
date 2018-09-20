import React from 'react';
import { View, Image, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const AlertPanel = ({
  icon, highlight, text, color,
}) => (
  <View style={styles.alertPanel}>
    <Image style={styles.alertIcon} source={icon} />
    <Text style={[styles.alertTextBold, { color }]}>{highlight}</Text>
    <Text style={[styles.alertText, { color }]}>{text}</Text>
  </View>
);

AlertPanel.propTypes = {
  icon: PropTypes.number.isRequired,
  highlight: PropTypes.string,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

AlertPanel.defaultProps = {
  highlight: null,
  color: null,
};


export default AlertPanel;
