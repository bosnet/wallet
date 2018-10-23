import React from 'react';
import PropTypes from 'prop-types';
import { SelectableAccountItem, SelectableAddressItem } from './Selectables';
import { types } from '../../resources';

const SelectableItem = ({ item, addItem, removeItem }) => {
  let result = null;
  switch (item.type) {
    case types.ListItem.ACCOUNT:
      result = (
        <SelectableAccountItem
          key={item.listKey}
          account={item.account}
          icon={item.icon}
        />
      );
      break;
    case types.ListItem.ADDRESS:
      result = (
        <SelectableAddressItem
          key={item.listKey}
          id={`item${item.listKey}`}
          name={item.name}
          address={item.address}
          addItem={addItem}
          removeItem={removeItem}
        />
      );
      break;
    default:
      result = (
        <SelectableAddressItem
          text={item.key}
          textColor={item.textColor}
          action={item.action}
          onPress={item.onPress}
        />
      );
  }
  return result;
};

SelectableItem.propTypes = {
  item: PropTypes.shape({ key: PropTypes.string }).isRequired,
};

export default SelectableItem;
