import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import CenterElement from './PurpleToolbarElements/CenterElement';
import RightElement from './PurpleToolbarElements/RightElement';

import styles from './styles';

const PurpleToolbar = ({ title, backText }) => (
  <View style={styles.purpleToolbar}>
    <CenterElement title={title} />
    <RightElement text={backText} />
  </View>
);

PurpleToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  backText: PropTypes.string.isRequired,
};

export default PurpleToolbar;
