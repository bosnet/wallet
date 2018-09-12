import React from 'react';
import PropTypes from 'prop-types';
import DefaultItem from './DefaultItem';

const FlatItem = ({ item }) => {
  return (
    <DefaultItem
      item={item.key}
    />
  );
};

FlatItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default FlatItem;
