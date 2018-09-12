import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import CenterElement from './WhiteToolbarElements/CenterElement';
import LeftElement from './WhiteToolbarElements/LeftElement';

import styles from './styles';

const WhiteToolbar = ({ title }) => (
  <View style={styles.whiteToolbar}>
    <LeftElement />
    <CenterElement title={title} />
  </View>
);

WhiteToolbar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default WhiteToolbar;
