import React from 'react';
import { View, Image, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const InfoPage = ({
  headText,
  image,
  size,
  contentText,
}) => (
  <View style={styles.infoPage}>
    <Text
      style={styles.infoHeadText}
      numberOfLines={3}
    >
      {headText}
    </Text>
    <Image
      style={[styles.infoImage, { width: size.width, height: size.height }]}
      source={image}
    />
    <View style={styles.infoContentArea}>
      <Text style={styles.infoContentText}>{contentText}</Text>
    </View>
  </View>
);

InfoPage.propTypes = {
  headText: PropTypes.string.isRequired,
  image: PropTypes.number.isRequired,
  size: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
  contentText: PropTypes.string.isRequired,
};

export default InfoPage;
