import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const getTextKey = index => `noti${index}`;

const createTexts = (texts, textColor) => texts.map((text, index) => (
  <Text
    key={getTextKey(index)}
    style={[styles.notiText, textColor ? { color: textColor } : null]}
  >
    {text}
  </Text>
));

const NotiPanel = ({ texts, color }) => (
  <View style={styles.notiPanel}>
    {createTexts(texts, color)}
  </View>
);

NotiPanel.propTypes = {
  texts: PropTypes.arrayOf(PropTypes.string).isRequired,
  color: PropTypes.string,
};

NotiPanel.defaultProps = {
  color: null,
};

export default NotiPanel;
