import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import { colors } from '../../resources';

const createKey = (item, i) => `${item}${i}`;

const createButtons = buttons => buttons.map(
  (button, index) => {
    const result = [];

    if (index > 0) {
      result.push((<View style={styles.panelButtonSeperator} key={createKey('view', index)} />));
    }

    result.push((
      <TouchableOpacity
        style={index !== 2 ? styles.pannelButton : styles.pannelButtonLong}
        key={createKey('button', index)}
        onPress={button.onPress}
      >
        <Text style={styles.panelButtonText}>{button.text}</Text>
      </TouchableOpacity>
    ));

    return result;
  },
);

const PanelButton = ({
  buttons,
}) => (
  <View style={styles.panelButtonGroup}>
    {createButtons(buttons)}
  </View>
);


PanelButton.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
  })).isRequired,
};


export default PanelButton;
