import React from 'react';

import DefaultItem from './Items/DefaultItem';

const SectionItem = ({ item, index, section }) => (
  <DefaultItem
    text={item}
  />
);

export default SectionItem;
