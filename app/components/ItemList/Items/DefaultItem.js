import React from 'react';
import { connect } from 'react-redux';
import { Text, Image, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';

import styles from '../styles';
import arrow from '../../../res/images/arrow.png';

const DefaultItem = ({ item, goMemberShip }) => (
  <TouchableOpacity
    style={styles.listItem}
    onPress={goMemberShip}
  >
    <Text style={styles.itemText}>
      {item}
    </Text>
    <Image style={styles.itemArrow} source={arrow} />
  </TouchableOpacity>
);

DefaultItem.propTypes = {
  item: PropTypes.string.isRequired,
  goMemberShip: PropTypes.func.isRequired,
};


const mapDispatchToProps = (dispatch, props) => ({
  goMemberShip: () => dispatch(NavigationActions.navigate({ routeName: props.goto })),
});


export default connect(null, mapDispatchToProps)(DefaultItem);
