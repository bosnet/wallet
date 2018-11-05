import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from '../../styles';

const ThemeStyle = {
  white: {
    text: styles.navyText,
  },
  whiteLight: {
    text: styles.purpleText,
  },
  purple: {
    text: styles.whiteText,
  },
};

const createActionArea = (theme, data, onPress) => (
  <TouchableOpacity
    style={styles.actionArea}
    onPress={onPress}
  >
    <Text
      style={[styles.actionText, ThemeStyle[theme].text]}
      numberOfLines={1}
    >
      {data.actionText}
    </Text>
  </TouchableOpacity>
);

const RightElement = ({ theme, data, onPress }) => (
  <View style={[styles.toolbarElement, styles.rightElement]}>
    { (data && data.actionText)
      ? createActionArea(theme, data, data.action ? onPress(data.action) : null)
      : null}
  </View>
);

RightElement.propTypes = {
  theme: PropTypes.string.isRequired,
  data: PropTypes.shape({}),
  onPress: PropTypes.func,
};

RightElement.defaultProps = {
  data: {},
  onPress: null,
};

const mapDispatchToProps = dispatch => ({
  onPress: action => () => {
    dispatch(action);
  },
});

export default connect(null, mapDispatchToProps)(RightElement);
