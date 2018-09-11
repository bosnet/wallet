import React from 'react';
import { View, Text, SectionList } from 'react-native';
import PropTypes from 'prop-types';

import Item from './Items/index';
import styles from './styles';

const LabeledList = ({ sections }) => (
  <SectionList
    style={styles.sectionList}
    sections={sections}
    renderItem={Item}
    renderSectionHeader={({ section: { title } }) => (
      <Text style={styles.sectionHeader}>{title}</Text>
    )}
    renderSectionFooter={() => (
      <View style={styles.sectionFotter} />
    )}
    keyExtractor={(item, index) => item + index}
  />
);

LabeledList.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default LabeledList;
