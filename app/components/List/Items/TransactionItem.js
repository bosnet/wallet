import React from 'react';
import { connect } from 'react-redux';
import { Text, Image, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from '../styles';
import arrow from '../../../resources/images/arrow.png';
import { colors } from '../../../resources';

const TransactionItem = ({ item, textColor, action, onPress }) => (
  <View
    style={styles.transactionItem}
    onPress={action ? onPress : null}
    key={item.key}
  >
    <Text style={styles.transactionTitle}>
      {item.title}
    </Text>
    <Text style={styles.transactionAccount}>
      {item.accountName}
    </Text>
    <Text style={styles.transactionDate}>
      {item.date}
    </Text>
    <View style={styles.transactionAccountArea}>
      <Text style={[styles.transactionAmount, { color: textColor }]}>
        {item.amount}
      </Text>
      <Text style={[styles.transactionUnit, { color: textColor }]}>
        BOS
      </Text>
    </View>
  </View>
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

const mapDispatchToProps = (dispatch, props) => ({
  onPress: () => dispatch(props.action),
});

export default connect(null, mapDispatchToProps)(TransactionItem);
