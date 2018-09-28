import React from 'react';
import { connect } from 'react-redux';
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

const BottomButton = ({ actions, inactive, onPress }) => (
  <View style={styles.bottomArea}>
    { actions.length > 1 ? createButton(actions) : null }
    <TouchableOpacity
      disabled={inactive}
      style={[styles.bottomButton, inactive ? styles.inactive : null]}
      onPress={() => onPress(actions[0].action)}
    >
      <Text style={styles.bottomButtonText}>{actions[0].text}</Text>
    </TouchableOpacity>
  </View>
);


BottomButton.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
  })),
  inactive: PropTypes.bool,
  onPress: PropTypes.func,
};

BottomButton.defaultProps = {
  inactive: false,
  onPress: null,
  actions: [{ action: { type: 'NONE' } }],
};

const mapDispatchToProps = dispatch => ({
  onPress: action => dispatch(action),
});

export default connect(null, mapDispatchToProps)(BottomButton);
