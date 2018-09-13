import React from 'react';
import PropTypes from 'prop-types';
import { DefaultItem } from './Items';

const FlatItem = ({ item }) => (
  <DefaultItem
    text={item.key}
    action={item.action}
  />
);

FlatItem.propTypes = {
  item: PropTypes.shape({ key: PropTypes.string }).isRequired,
};

export default FlatItem;
