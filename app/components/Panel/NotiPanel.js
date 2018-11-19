import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const getTextKey = index => `noti${index}`;

const renderStar = textColor => (
  <Text
    style={textColor ? { color: textColor } : null}
  >
    {'* '}
  </Text>
);

const createTexts = (texts, textColor, noStar) => texts.map((text, index) => {
  if (!text || text.length === 0) return null;

  return (
    <View
      style={styles.notiTextArea}
      key={getTextKey(index)}
    >
      {noStar ? null : renderStar(textColor)}
      <Text
        style={[styles.notiText, textColor ? { color: textColor } : null]}
      >
        {text}
      </Text>
    </View>
  );
});

const NotiPanel = ({ texts, color, noStar }) => (
  <View style={styles.notiPanel}>
    {createTexts(texts, color, noStar)}
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
