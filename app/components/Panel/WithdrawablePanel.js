import React from 'react';
import { View, Image, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import { colors } from '../../resources';

const WithdrawablePanel = ({
  title, backgroundColor, amount, textColor,
}) => (
  <View style={[styles.withdrawPanel, { backgroundColor: backgroundColor }]}>
    <Text style={[styles.withdrawTitle, { color: textColor }]}>{title}</Text>
    <View style={styles.withdrawContents}>
      <Text style={[styles.withdraw, { color: textColor }]}>{amount}</Text>
      <Text style={[styles.withdrawUnit, { color: textColor }]}>BOS</Text>
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
