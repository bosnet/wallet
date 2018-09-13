import React from 'react';
import { connect } from 'react-redux';
import { Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from '../styles';
import arrow from '../../../resources/images/arrow.png';

const DefaultItem = ({ text, action, onPress }) => (
  <TouchableOpacity
    style={styles.listItem}
    onPress={action ? onPress : null}
  >
    <Text style={styles.itemText}>
      {text}
    </Text>
    <Image style={styles.itemArrow} source={arrow} />
  </TouchableOpacity>
);

DefaultItem.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  action: PropTypes.shape({ type: {} }),
};

DefaultItem.defaultProps = {
  onPress: null,
  action: null,
};

const mapDispatchToProps = (dispatch, props) => ({
  onPress: () => dispatch(props.action),
});

export default connect(null, mapDispatchToProps)(DefaultItem);
