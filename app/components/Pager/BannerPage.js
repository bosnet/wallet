import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const BannerPage = ({
  text, color, textColor,
}) => (
  <View style={[styles.bannerCard, { backgroundColor: color }]}>
    <Text style={[styles.bannerTextArea, styles.bannerText, { color: textColor }]}>{text}</Text>
  </View>
);

BannerPage.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
};

export default BannerPage;
