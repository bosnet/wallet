import React from 'react';
import { connect } from 'react-redux';
import {
  Text, Image, View, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from '../styles';
import { colors } from '../../../resources';
import { Navigation as NavAction } from '../../../actions';

import icVoting from '../../../resources/images/voting_orange.png';

const createIcon = (icon) => {
  let result = null;

  switch (icon) {
    case 'voting':
      result = (
        <Image style={styles.accountIcon} source={icVoting} />
      );
      break;
    default:
      break;
  }

  return result;
};

const isFreezing = (freezing) => {
  let result = (
    <View style={{ marginTop: 15 }} />
  );
  if (freezing) {
    result = (
      <Text style={styles.accountFreezing}>
        Freezing
      </Text>
    );
  }

  return result;
};

const AccountItem = ({
  account,
  icon,
  onPress,
}) => (
  <TouchableOpacity
    style={styles.accountItem}
    onPress={account ? () => {
      onPress(NavAction.pushScreen(NavAction.Screens.TRANSACTION_LIST, { account }));
    } : null}
  >
    <View style={styles.accoutnItemHead}>
      <Text style={styles.accountName}>
        {account.name}
      </Text>
      {createIcon(icon)}
    </View>
    {isFreezing(false)}
    <View style={styles.accountItemContent}>
      <Text style={styles.accountBalance}>{account.amount ? account.amount : 0}</Text>
      <Text style={styles.accountUnit}>BOS</Text>
    </View>
  </TouchableOpacity>
);

AccountItem.propTypes = {
  onPress: PropTypes.func,
  action: PropTypes.shape({ type: {} }),
  textColor: PropTypes.string,
};

AccountItem.defaultProps = {
  onPress: null,
  action: null,
  textColor: colors.itemTextBlack,
};

const mapDispatchToProps = (dispatch) => ({
  onPress: action => dispatch(action),
});

export default connect(null, mapDispatchToProps)(AccountItem);
