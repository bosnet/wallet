import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from '../styles';

const RightElement = ({ text, goBack }) => (
  <View>
    <TouchableOpacity
      onPress={goBack}
    >
      <Text style={styles.purpleToolbarBackText}>{text}</Text>
    </TouchableOpacity>
  </View>
);

RightElement.propTypes = {
  text: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(NavigationActions.back()),
});


export default connect(null, mapDispatchToProps)(RightElement);
