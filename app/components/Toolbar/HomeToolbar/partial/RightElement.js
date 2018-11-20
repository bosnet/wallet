import React from 'react';
import { connect } from 'react-redux';
import { View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { Navigation as NavAction } from '../../../../actions';

import styles from '../../styles';
import IconAdd from '../../../../resources/images/icon-add.png';
import IconIn from '../../../../resources/images/icon-in.png';
import IconSettings from '../../../../resources/images/icon-setting.png';

const RightElement = ({ onPress }) => (
  <View style={styles.toolbarElement}>
    <View style={styles.actionGroup}>
      <TouchableOpacity
        style={styles.actionIcon}
        onPress={onPress(NavAction.pushScreen(NavAction.Screens.AGREEMENT))}
      >
        <Image style={styles.Icon} source={IconAdd} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionIcon}
        onPress={onPress(NavAction.pushScreen(NavAction.Screens.SELECT_IMPORT_TYPE))}
      >
        <Image style={styles.IconIn} source={IconIn} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionIcon}
        onPress={onPress(NavAction.pushScreen(NavAction.Screens.SETTINGS))}
      >
        <Image style={styles.Icon} source={IconSettings} />
      </TouchableOpacity>
    </View>
  </View>
);

RightElement.propTypes = {
  onPress: PropTypes.func,
};

RightElement.defaultProps = {
  onPress: null,
};

const mapDispatchToProps = dispatch => ({
  onPress: action => () => dispatch(action),
});

export default connect(null, mapDispatchToProps)(RightElement);
