import React from 'react';
import {
  View, Text,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const AddressPanel = () => (
  <View style={styles.addressPanel}>
    <Text style={styles.addressPanelTitle}>저장된 공개 주소</Text>
    <Text style={styles.addressPanelContents}>
      <Text style={styles.PanelContentsNum}>20</Text>
      <Text style={styles.PanelContentsStr}>개</Text>
    </Text>
  </View>
);

export default AddressPanel;
