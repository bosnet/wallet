import React from 'react';
import {
  View, Text,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const AddressPanel = ({ count }) => (
  <View style={styles.addressPanel}>
    <Text style={styles.addressPanelTitle}>저장된 공개 주소</Text>
    <Text style={styles.addressPanelContents}>
      <Text style={styles.addressSubTextNum}>{count}</Text>
      <Text style={styles.addressSubTextStr}>개</Text>
    </Text>
  </View>
);

AddressPanel.propTypes = {
  count: PropTypes.number.isRequired,
};

export default AddressPanel;
