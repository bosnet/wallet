import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from '../../styles';

const ThemeStyle = {
  white: {
    text: styles.navyText,
  },
  purple: {
    text: styles.whiteText,
  },
};

const CenterElement = ({ theme, data }) => (
  <View style={[styles.toolbarElement, styles.centerElement]}>
    <Text style={[styles.centerTitle, ThemeStyle[theme].text]}>
      {(data && data.title) ? data.title : null}
    </Text>
  </View>
);

CenterElement.propTypes = {
  theme: PropTypes.string.isRequired,
  data: PropTypes.shape({}),
};

CenterElement.defaultProps = {
  data: null,
};

export default CenterElement;
