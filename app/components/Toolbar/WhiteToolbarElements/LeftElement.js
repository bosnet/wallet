import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import {
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from '../styles';
import backChevron from '../../../res/images/back_chevron.png';

const LeftElement = ({ goBack }) => (
  <View>
    <TouchableOpacity
      style={styles.whiteToolbarBack}
      onPress={goBack}
    >
      <Image style={styles.whiteToolbarBackImage} source={backChevron} />
    </TouchableOpacity>
  </View>
);

LeftElement.propTypes = {
  goBack: PropTypes.func.isRequired,
};


const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(NavigationActions.back()),
});

export default connect(null, mapDispatchToProps)(LeftElement);
