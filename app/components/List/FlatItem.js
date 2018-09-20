import React from 'react';
import PropTypes from 'prop-types';
import { DefaultItem, TransactionItem } from './Items';
import { types } from '../../resources';

const FlatItem = ({ item }) => {
  let result = null;
  switch (item.type) {
    case types.ListItem.TEXT:
      result = (
        <DefaultItem
          text={item.key}
          action={item.action}
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
    default:
      result = (
        <DefaultItem
          text={item.key}
          action={item.action}
        />
      );
  }
  return result;
};

FlatItem.propTypes = {
  item: PropTypes.shape({ key: PropTypes.string }).isRequired,
};

export default FlatItem;
