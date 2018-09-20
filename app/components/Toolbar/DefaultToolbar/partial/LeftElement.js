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
  whiteLight: {
    text: styles.purpleText,
  },
  purple: {
    text: styles.whiteText,
  },
};

const createBackArea = () => (
  <TouchableOpacity
    style={styles.backArea}
  >
    <Image style={styles.backArrow} source={backChevron} />
  </TouchableOpacity>
);

const createLeftMargin = () => (
  <View
    style={styles.noBackMargin}
  />
);

const LeftElement = ({ theme, data }) => (
  <View style={[styles.toolbarElement, styles.leftElement]}>
    { (data && data.hasArrow) ? createBackArea() : createLeftMargin()}
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
  data: {},
};

export default LeftElement;
