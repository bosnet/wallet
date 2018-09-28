import React from 'react';
import {
  View, Image, Text, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Navigation } from '../../../../actions';

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

const createBackArea = goBack => (
  <TouchableOpacity
    style={styles.backArea}
    onPress={goBack}
  >
    <Image style={styles.backArrow} source={backChevron} />
  </TouchableOpacity>
);

const createLeftMargin = () => (
  <View
    style={styles.noBackMargin}
  />
);

const LeftElement = ({ theme, data, goBack }) => (
  <View style={[styles.toolbarElement, styles.leftElement]}>
    { (data && data.hasArrow) ? createBackArea(goBack) : createLeftMargin()}
    <Text style={[styles.leftTitle, ThemeStyle[theme].text]}>
      {(data && data.title) ? data.title : null}
    </Text>
  </View>
);

LeftElement.propTypes = {
  theme: PropTypes.string.isRequired,
  data: PropTypes.shape({}),
  goBack: PropTypes.func,
};

LeftElement.defaultProps = {
  data: {},
  goBack: null,
};


const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(Navigation.popScreen()),
});

export default connect(null, mapDispatchToProps)(LeftElement);
