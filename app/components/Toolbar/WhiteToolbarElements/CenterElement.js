import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles';

const CenterElement = ({ title }) => (
  <View style={styles.whiteToolbarTitle}>
    <Text style={styles.whiteToolbarTitleText}>{title}</Text>
  </View>
);

export default CenterElement;
