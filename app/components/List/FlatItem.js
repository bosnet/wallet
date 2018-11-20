import React from 'react';
import PropTypes from 'prop-types';
import {
  DefaultItem, TransactionItem, AccountItem, AddressItem
} from './Items';
import { types } from '../../resources';
import { TextArea } from '../Text';

const FlatItem = ({ item }) => {
  let result = null;
  switch (item.type) {
    case types.ListItem.TEXT:
      result = (
        <DefaultItem
          text={item.key}
          textColor={item.textColor}
          action={item.action}
          onPress={item.onPress}
        />
      );
      break;
    case types.ListItem.TRANSACTION:
      result = (
        <TransactionItem
          item={item}
          textColor={item.textColor}
          action={item.action}
        />
      );
      break;
    case types.ListItem.ACCOUNT:
      result = (
        <AccountItem
          key={item.listKey}
          account={item.account}
          icon={item.icon}
        />
      );
      break;
    case types.ListItem.TEXTAREA:
      result = (
        <TextArea
          key={item.listKey}
          label={item.name}
          text={item.address}
        />
      );
      break;
    case types.ListItem.ADDRESS:
      result = (
        <AddressItem
          key={item.listKey}
          id={`item${item.listKey}`}
          address={item.address}
          addItem={item.addItem}
          resetAllItem={item.resetAllItem}
          removeItem={item.removeItem}
        />
      );
      break;
    default:
      result = (
        <DefaultItem
          text={item.key}
          textColor={item.textColor}
          action={item.action}
          onPress={item.onPress}
        />
      );
  }
  return result;
};

FlatItem.propTypes = {
  item: PropTypes.shape({ key: PropTypes.string }).isRequired,
};

export default FlatItem;
