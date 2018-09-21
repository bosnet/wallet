import React from 'react';
import {
  View, Text, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import { colors } from '../../resources';


const InputBalance = ({
  label,
  subLabel,
  lableColor,
  textColor,
  underline,
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
      <TextInput
        style={[styles.balanceAmount, { color: textColor }]}
        underlineColorAndroid="rgba(0,0,0,0)"
      />
      <Text style={[styles.balanceUnit, { color: textColor }]}>BOS</Text>
    </View>
  </View>
);

InputBalance.propTypes = {
  label: PropTypes.oneOfType(PropTypes.string, PropTypes.element),
  lableColor: PropTypes.string,
  textColor: PropTypes.string,
  underline: PropTypes.bool,
};

InputBalance.defaultProps = {
  label: null,
  option: null,
  lableColor: colors.labelTextBlack,
  textColor: colors.textAreaContentsGray,
  underline: true,
  type: 'text',
};

export default InputBalance;
