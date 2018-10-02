import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';


const createButton = actions => (
  <TouchableOpacity
    style={[styles.bottonSubButton]}
  >
    <Text style={styles.bottomSubButtonText}>{actions[1].text}</Text>
  </TouchableOpacity>
);

const BottomButton = ({
  actions,
  inactive,
  callback,
  onPress,
}) => (
  <View
    style={styles.bottomArea}
    {...this.props}
  >
    {actions.length > 1 ? createButton(actions) : null}
    <TouchableOpacity
      disabled={inactive} // Touchable Opacity Style 반영 이슈때문에 Style 변경위해 사용
      style={[styles.bottomButton, inactive ? styles.inactive : null]}
      onPress={() => {
        if (!inactive) onPress(actions[0].action);
      }}
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
  callback: PropTypes.func,
};

BottomButton.defaultProps = {
  inactive: false,
  onPress: null,
  actions: [{ action: { type: 'NONE' } }],
  callback: null,
};

const mapDispatchToProps = dispatch => ({
  onPress: (action) => {
    if (action && action.type) return dispatch(action);

    return null;
  },
});

export default connect(null, mapDispatchToProps)(BottomButton);
