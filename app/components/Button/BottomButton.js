import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';


const createButton = actions => (
  <TouchableOpacity
    style={[styles.bottonSubButton]}
  >
    <Text style={styles.bottomSubButtonText}>{actions[1].text}</Text>
  </TouchableOpacity>
);

const BottomButton = ({ actions, inactive }) => (
  <View style={styles.bottomArea}>
    { actions.length > 1 ? createButton(actions) : null }
    <TouchableOpacity
      style={[styles.bottomButton, inactive ? styles.inactive : null]}
    >
      <Text style={styles.bottomButtonText}>{actions[0].text}</Text>
    </TouchableOpacity>
  </View>
);


BottomButton.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
  })).isRequired,
  inactive: PropTypes.bool,
};

BottomButton.defaultProps = {
  inactive: false,
};

export default BottomButton;
