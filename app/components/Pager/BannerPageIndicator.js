import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const getViewKey = index => `indi${index}`;

const createIndicator = (size, index) => {
  const elements = [];
  for (let i = 0; i < size; i += 1) {
    if (i === index) elements.push(<View key={getViewKey(i)} style={styles.pageActive} />);
    else elements.push(<View key={i} style={styles.pageInactive} />);
  }

  return elements;
};

const BannerPageIndicator = ({ size, index }) => (
  <View style={styles.bannerPageIndicator}>
    {createIndicator(size, index)}
  </View>
);

BannerPageIndicator.propTypes = {
  size: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};


export default BannerPageIndicator;
