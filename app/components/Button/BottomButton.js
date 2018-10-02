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


class BottomButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };

    this.createButton = this.createButton.bind(this);
  }

  createButton() {
    const { actions, onPress } = this.props;

    return (
      <TouchableOpacity
        style={[styles.bottonSubButton]}
        onPress={() => {
          onPress(actions[1].action);
          if (actions[1].callback) actions[1].callback();
        }}
      >
        <Text style={styles.bottomSubButtonText}>{actions[1].text}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const {
      actions,
      inactive,
      onPress,
    } = this.props;

    return (
      <View
        style={styles.bottomArea}
      >
        {actions.length > 1 ? this.createButton(actions) : null}
        <TouchableOpacity
          disabled={inactive} // Touchable Opacity Style 반영 이슈때문에 Style 변경위해 사용
          style={[styles.bottomButton, inactive ? styles.inactive : null]}
          onPress={() => {
            onPress(actions[0].action);
            if (actions[0].callback) actions[0].callback();
          }}
        >
          <Text style={styles.bottomButtonText}>{actions[0].text}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
  onPress: (action) => {
    if (action && action.type) return dispatch(action);

    return null;
  },
});

export default connect(null, mapDispatchToProps)(BottomButton);
