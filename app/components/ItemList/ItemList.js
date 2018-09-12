import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';

import Item from './Items/FlatItem';
import styles from './styles';

const ItemList = ({ data }) => (
  <FlatList
    style={styles.itemList}
    data={data}
    renderItem={Item}
  />
);

ItemList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ItemList;
