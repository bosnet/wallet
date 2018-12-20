import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import QRCode from 'react-native-qrcode-svg';

import styles from './styles';

const QRPanel = ({ value }) => (
  <View style={styles.qrPanel}>
    <QRCode
      value={value}
      size={163}
    />
  </View>
);

QRPanel.propTypes = {
  value: PropTypes.string.isRequired,
};

export default QRPanel;
