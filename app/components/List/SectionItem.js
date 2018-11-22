import React from 'react';
import PropTypes from 'prop-types';
import {
  DefaultItem, ToggleItem, OptionTextItem, ExLinkItem,
} from './Items';
import { types } from '../../resources';

const SectionItem = ({ item, index, section }) => {
  let result = null;
  if (item === null) {
    return null;
  }

  const data = section.data[index];
  switch (item.type) {
    case types.ListItem.TEXT:
      result = (
        <DefaultItem
          text={data.text}
          action={data.action}
        />
      );
      break;
    case types.ListItem.OPTION_TEXT:
      result = (
        <OptionTextItem
          text={data.text}
          value={data.value}
          action={data.action}
        />
      );
      break;
    case types.ListItem.EX_LINK:
      result = (
        <ExLinkItem
          text={data.text}
          value={data.value}
        />
      );
      break;
    case types.ListItem.TOGGLE:
      result = (
        <ToggleItem
          text={data.text}
          action={data.action}
        />
      );
      break;
    default:
      result = (
        <DefaultItem
          text={data.text}
          action={data.action}
        />
      );
  }
  return result;
};

SectionItem.propTypes = {
  item: PropTypes.shape({ key: PropTypes.string }).isRequired,
};

export default SectionItem;
