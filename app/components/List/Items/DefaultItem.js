import React from 'react';
import { connect } from 'react-redux';
import { Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from '../styles';
import { colors } from '../../../resources';
import arrow from '../../../resources/images/arrow.png';

const DefaultItem = ({
  text, textColor, action, onPress, doAction,
}) => (
  <TouchableOpacity
    style={styles.listItem}
    onPress={() => {
      if (action) doAction();
      if (onPress) onPress();
    }}
  >
    <Text style={[styles.itemText, { color: textColor }]}>
      {text}
    </Text>
    <Image style={styles.itemArrow} source={arrow} />
  </TouchableOpacity>
);

DefaultItem.propTypes = {
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  doAction: PropTypes.func,
  onPress: PropTypes.func,
  action: PropTypes.shape({ type: {} }),
};

DefaultItem.defaultProps = {
  textColor: colors.itemTextBlack,
  doAction: null,
  onPress: null,
  action: null,
};

const mapDispatchToProps = (dispatch, props) => ({
  doAction: () => dispatch(props.action),
});

export default connect(null, mapDispatchToProps)(DefaultItem);
