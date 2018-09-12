import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from '../styles';

const CenterElement = ({ title }) => (
  <View style={styles.purpleToolbarTitle}>
    <Text style={styles.purpleToolbarTitleText}>{title}</Text>
  </View>
);

CenterElement.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CenterElement;
