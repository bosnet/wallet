import React from 'react';
import {
  View, Text,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';

import styles from './styles';
import { colors } from '../../resources';
import strings from '../../resources/strings';


const BalanceArea = ({
  label,
  subLabel,
  lableColor,
  text,
  textColor,
  settings,
}) => {
  const Strings = strings[settings.language].ComponentText;

  return (
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
        <Text style={[styles.balanceAmount, { color: textColor }]}>{!isNaN(text) ? new BigNumber(text).toFormat(7) : Strings.ON_DELAYING}</Text>
        <Text style={[styles.balanceUnit, { color: textColor }]}>{!isNaN(text) ? 'BOS' : ''}</Text>
      </View>
    </View>
  );
}

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

const mapStateToProps = state => ({
  settings: state.settings,
});

export default connect(mapStateToProps)(BalanceArea);
