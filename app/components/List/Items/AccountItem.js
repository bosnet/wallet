import React from 'react';
import { connect } from 'react-redux';
import { Text, Image, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from '../styles';
import { colors } from '../../../resources';

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
  item,
  textColor,
  action,
  onPress,
}) => (
  <View
    style={styles.accountItem}
    onPress={action ? onPress : null}
    key={item.key}
  >
    <View style={styles.accoutnItemHead}>
      <Text style={styles.accountName}>
        {item.name}
      </Text>
      {createIcon(item.icon)}
    </View>
    {isFreezing(item.freezing)}
    <View style={styles.accountItemContent}>
      <Text style={styles.accountBalance}>{item.amount}</Text>
      <Text style={styles.accountUnit}>BOS</Text>
    </View>
  </View>
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

const mapDispatchToProps = (dispatch, props) => ({
  onPress: () => dispatch(props.action),
});

export default connect(null, mapDispatchToProps)(AccountItem);
