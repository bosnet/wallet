import React from 'react';
import {
  View, Text,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import { colors } from '../../resources';


const BalanceArea = ({
  label,
  subLabel,
  lableColor,
  text,
  textColor,
}) => (
  <View
    style={styles.balanceArea}
  >
    <View style={styles.balanceHead}>
      <Text
        style={[
          styles.balanceTitle,
          { color: lableColor },
        ]}
      >
        {label}
      </Text>
      <Text style={styles.balanceSubTitle}>
        {subLabel}
      </Text>
    </View>
    <View style={styles.balanceContentArea}>
      <Text style={[styles.balanceAmount, { color: textColor }]}>{text}</Text>
      <Text style={[styles.balanceUnit, { color: textColor }]}>BOS</Text>
    </View>
  </View>
);

BalanceArea.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  subLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  text: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.string]).isRequired,
  lableColor: PropTypes.string,
  textColor: PropTypes.string,
};

BalanceArea.defaultProps = {
  label: null,
  subLabel: null,
  lableColor: colors.labelTextBlack,
  textColor: colors.textAreaContentsGray,
};

export default BalanceArea;
