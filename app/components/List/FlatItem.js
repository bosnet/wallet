import React from 'react';
import PropTypes from 'prop-types';
import { DefaultItem } from './Items';

const FlatItem = ({ item }) => {
  return (
    <DefaultItem
      text={item.key}
    />
  );
};

FlatItem.propTypes = {
  item: PropTypes.shape({ key: PropTypes.string }).isRequired,
};

export default FlatItem;
