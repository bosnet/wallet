import React from 'react';
import { View, Image, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import { colors } from '../../resources';

const WithdrawablePanel = ({
  title, backgroundColor, amount, textColor,
}) => (
  <View style={[styles.balancePanel, { backgroundColor: backgroundColor }]}>
    <Text style={[styles.balanceTitle, { color: textColor }]}>{title}</Text>
    <View style={styles.balanceContents}>
      <Text style={[styles.balance, { color: textColor }]}>{amount}</Text>
      <Text style={[styles.balanceUnit, { color: textColor }]}>BOS</Text>
    </View>
  </View>
);

WithdrawablePanel.propTypes = {
  title: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  amount: PropTypes.string.isRequired,
  textColor: PropTypes.string,
};

WithdrawablePanel.defaultProps = {
  backgroundColor: colors.panelBkgPurble,
  textColor: colors.panelTextWhite,
};


export default WithdrawablePanel;
