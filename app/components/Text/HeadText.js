import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import { colors } from '../../resources';

const HeadText = ({
  text,
  color,
}) => (
  <View style={styles.headText}>
    <Text style={[styles.headTextContent, { color }]}>{text}</Text>
  </View>
);

HeadText.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  color: PropTypes.string,
};

HeadText.defaultProps = {
  color: colors.headTextBlack,
};

export default HeadText;
