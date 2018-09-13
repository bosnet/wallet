import React from 'react';

import DefaultItem from './Items/DefaultItem';
import TextItem from './Items/TextItem';
import ToggleItem from './Items/ToggleItem';

const SectionItem = ({ item, index, section }) => {
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
      case 'ToggleItem':
        return (
          <ToggleItem
            item={item}
          />
        );
      default:
        return (
          <DefaultItem
            item={item}
            goto={(section.goto && section.goto[index]) ? section.goto[index] : null}
          />
        );
    }
  } else {
    return (
      <DefaultItem
        item={item}
        goto={(section.goto && section.goto[index]) ? section.goto[index] : null}
      />
    );
  }
};


export default SectionItem;
