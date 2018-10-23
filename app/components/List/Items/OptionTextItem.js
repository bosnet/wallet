import React from 'react';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from '../styles';
import arrow from '../../../resources/images/arrow.png';

const OptionTextItem = ({
  text, value, action, onPress,
}) => (
  <TouchableOpacity
    style={styles.listItem}
    onPress={action ? onPress : null}
  >
    <Text style={styles.itemText}>
      {text}
    </Text>
    <View
      style={styles.rowDirection}
    >
      <Text style={styles.optionTextItemData}>
        {value}
      </Text>
      <Image style={styles.itemArrow} source={arrow} />
    </View>
  </TouchableOpacity>
);

OptionTextItem.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  action: PropTypes.shape({ type: {} }),
};

OptionTextItem.defaultProps = {
  onPress: null,
  action: null,
};

const mapDispatchToProps = (dispatch, props) => ({
  onPress: () => dispatch(props.action),
});

export default connect(null, mapDispatchToProps)(OptionTextItem);
