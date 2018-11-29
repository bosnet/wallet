import React from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';

import styles from '../styles';
import { colors } from '../../../resources';

import { Navigation as NavAction } from '../../../actions';
import { TextArea } from '../../Text';

const TransactionItem = ({ item, textColor, doAction }) => (
  <TouchableOpacity
    style={styles.transactionItem}
    onPress={() => {
      doAction(NavAction.pushScreen(NavAction.Screens.TRANSACTION_DETAIL, { item }));
    }}
    key={item.key}
  >
    <Text style={styles.transactionTitle}>
      {item.title}
    </Text>
    <View style={{ marginHorizontal: -24 }}>
      <TextArea
        label={item.name}
        text={item.address}
        underline={false}
      />
    </View>
    <Text style={styles.transactionDate}>
      {item.date}
    </Text>
    <View style={styles.transactionAccountArea}>
      <Text style={[styles.transactionAmount, { color: textColor }]}>
        {new BigNumber(item.amount).toFormat(7).replace(/[0]+$/, '').replace(/[.]+$/, '')}
      </Text>
      <Text style={[styles.transactionUnit]}>
        BOS
      </Text>
    </View>
  </TouchableOpacity>
);

TransactionItem.propTypes = {
  onPress: PropTypes.func,
  action: PropTypes.shape({ type: {} }),
  textColor: PropTypes.string,
};

TransactionItem.defaultProps = {
  onPress: null,
  action: null,
  textColor: colors.itemTextBlack,
};

const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

export default connect(null, mapDispatchToProps)(TransactionItem);
