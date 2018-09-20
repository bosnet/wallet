import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const QRPanel = ({ img }) => (
  <Image style={styles.qrPanel} source={img} />
);

QRPanel.propTypes = {
  img: PropTypes.number.isRequired,
};

export default QRPanel;
