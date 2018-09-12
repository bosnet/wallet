import React from 'react';
import {
  View, Text,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const LabeledArea = ({ title, contents }) => (
  <View style={styles.labeledArea}>
    <Text style={styles.labeledAreaTitle}>{title}</Text>
    <Text style={styles.labeledAreaContents}>{contents}</Text>
  </View>
);

export default LabeledArea;
