import React from 'react';
import {
  View, Image, Text, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from '../../styles';
import backChevron from '../../../../resources/images/back_chevron.png';

const ThemeStyle = {
  white: {
    text: styles.navyText,
  },
  purple: {
    text: styles.whiteText,
  },
};

const backArea = () => (
  <TouchableOpacity
    style={styles.backArea}
  >
    <Image style={styles.backArrow} source={backChevron} />
  </TouchableOpacity>
);

const noBackMargin = () => (
  <View
    style={styles.noBackMargin}
  />
);

const LeftElement = ({ theme, data }) => (
  <View style={[styles.toolbarElement, styles.leftElement]}>
    { (data && data.hasArrow) ? backArea() : noBackMargin()}
    <Text style={[styles.leftTitle, ThemeStyle[theme].text]}>
      {(data && data.title) ? data.title : null}
    </Text>
  </View>
);

LeftElement.propTypes = {
  theme: PropTypes.string.isRequired,
  data: PropTypes.shape({}),
};

LeftElement.defaultProps = {
  data: null,
};

export default LeftElement;
