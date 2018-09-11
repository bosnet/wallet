import React from 'react';

import DefaultItem from './DefaultItem';
import TextItem from './TextItem';

const Item = ({ item, index, section }) => {
  if (section.itemTypes && section.itemTypes[index]) {
    const itemType = section.itemTypes[index];
    switch (itemType.type) {
      case 'TextItem':
        return (
          <TextItem
            item={item}
            text={itemType.value}
          />
        );
      default:
        return (
          <DefaultItem
            item={item}
          />
        );
    }
  } else {
    return (
      <DefaultItem
        item={item}
      />
    );
  }
};

export default Item;
