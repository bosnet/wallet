import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles';
import { colors } from '../../resources';

const WithdrawablePanel = (props) => {
  const {
    title, backgroundColor, amount, textColor,
    action, callback, doAction,
  } = props;

  return (
    <TouchableOpacity
      {...props}
      style={[styles.withdrawPanel, { backgroundColor }]}
      activeOpacity={0.7}
      onPress={() => {
        if (action) doAction(action);
        if (callback) callback();
      }}
    >
      <Text style={[styles.withdrawTitle, { color: textColor }]}>{title}</Text>
      <View style={styles.withdrawContents}>
        <Text style={[styles.withdraw, { color: textColor }]}>{amount}</Text>
        <Text style={[styles.withdrawUnit, { color: textColor }]}>BOS</Text>
      </View>
    </TouchableOpacity>
  );
};

WithdrawablePanel.propTypes = {
  title: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  amount: PropTypes.number.isRequired,
  textColor: PropTypes.string,
};

WithdrawablePanel.defaultProps = {
  backgroundColor: colors.panelBkgPurble,
  textColor: colors.panelTextWhite,
};

const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

export default connect(null, mapDispatchToProps)(WithdrawablePanel);
