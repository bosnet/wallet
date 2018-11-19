import React from 'react';
import { connect } from 'react-redux';
import {
  View, Text,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import strings from '../../resources/strings';

const BalancePanel = ({ text, settings }) => {
  const Strings = strings[settings.language].ComponentText;

  return (
    <View style={styles.balancePanel}>
      <Text style={styles.balancePanelTitle}>BALANCE</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.balanceText}>{!isNaN(text) ? text : Strings.ON_DELAYING}</Text>
        <Text style={styles.balanceUnit}>{!isNaN(text) ? 'BOS' : ''}</Text>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  settings: state.settings,
});

BalancePanel.propTypes = {
  text: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.string]).isRequired,
};

export default connect(mapStateToProps)(BalancePanel);
