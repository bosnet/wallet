import React from 'react';
import {
  View,
  Text,
  FlatList,
  SectionList,
} from 'react-native';
import PropTypes from 'prop-types';
import SortableList from 'react-native-sortable-list';

import FlatItem from './FlatItem';
import SectionItem from './SectionItem';
import SortableItem from './SortableItem';

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
        return (
          <SectionList
            sections={listData.data}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.sectionHeader}>{title}</Text>
            )}
            renderSectionFooter={() => (
              <View style={styles.sectionFotter} />
            )}
            renderItem={SectionItem}
            keyExtractor={(item, index) => item + index}
          />
        );
      case types.ListType.SORTABLE:
        return (
          <SortableList
            style={{ flex: 1 }}
            data={listData.data}
            renderRow={SortableItem}
          />
        );
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
