import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import { colors } from '../../resources';

const LongButton = ({
  text,
  backgroundColor,
  textColor,
  borderColor,
  width,
  action,
  onPress,
}) => (
  <View>
    <TouchableOpacity
      style={[
        styles.longButton,
        {
          backgroundColor,
          borderColor,
          width,
        }]}
      onPress={() => onPress(action)}
    >
      <Text style={[styles.longButtonText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  </View>
);

LongButton.propTypes = {
  text: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  borderColor: PropTypes.string,
  width: PropTypes.oneOf(PropTypes.number, PropTypes.string),
  action: PropTypes.shape({
    type: PropTypes.string,
  }),
  onPress: PropTypes.func,
};

LongButton.defaultProps = {
  backgroundColor: colors.buttonPurple,
  textColor: colors.buttonTextWhite,
  borderColor: colors.buttonPurple,
  width: 280,
  onPress: null,
  action: { type: 'NONE' },
};

const mapDispatchToProps = dispatch => ({
  onPress: action => dispatch(action),
});

export default connect(null, mapDispatchToProps)(LongButton);
