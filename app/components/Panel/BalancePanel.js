import React from 'react';
import {
  View, Text,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const BalancePanel = ({ text }) => (
  <View style={styles.balancePanel}>
    <Text style={styles.balancePanelTitle}>BALANCE</Text>
    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.balanceText}>{text}</Text>
      <Text style={styles.balanceUnit}>BOS</Text>
    </View>
  </View>
);

BalancePanel.propTypes = {
  text: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.string]).isRequired,
};

export default BalancePanel;
