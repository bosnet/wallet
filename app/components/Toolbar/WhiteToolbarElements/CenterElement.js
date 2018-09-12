import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from '../styles';

const CenterElement = ({ title }) => (
  <View style={styles.whiteToolbarTitle}>
    <Text style={styles.whiteToolbarTitleText}>{title}</Text>
  </View>
);

CenterElement.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CenterElement;
