import React from 'react';
import { View, FlatList, SectionList } from 'react-native';
import PropTypes from 'prop-types';

import FlatItem from './FlatItem';

import styles from './styles';
import { types } from '../../resources';

const ItemList = ({ listType, listData }) => {
  const getListByType = () => {
    switch (listType) {
      case types.ListType.FLAT:
        return (
          <FlatList
            data={listData.data}
            renderItem={FlatItem}
          />
        );
      case types.ListType.SECTION:
        return <SectionList />;
      default:
        return (
          <FlatList
            data={listData.data}
            renderItem={FlatItem}
          />
        );
    }
  };
  return (
    <View style={styles.itemList}>
      {getListByType()}
    </View>
  );
};

ItemList.propTypes = {
  listType: PropTypes.string.isRequired,
  listData: PropTypes.shape({ data: PropTypes.arrayOf(PropTypes.object) }).isRequired,
};

export default ItemList;
