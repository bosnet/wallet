import React from 'react';
import {
  View, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles';
import strings from '../../resources/strings';


const AddressPanel = ({ count, settings }) => {
  const Strings = strings[settings.language].ComponentText;

  return (
    <View style={styles.addressPanel}>
      <Text style={styles.addressPanelTitle}>{Strings.ADDRESS_PANEL_TITLE}</Text>
      <Text style={styles.addressPanelContents}>
        <Text style={styles.addressSubTextNum}>{count}</Text>
      </Text>
    </View>
  );
}
const mapStateToProps = state => ({
  settings: state.settings,
});

export default connect(mapStateToProps)(AddressPanel);
