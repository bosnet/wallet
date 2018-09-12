import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const BottomButton = () => (
  <TouchableOpacity
    style={styles.bottomButton}
  >
    <Text style={styles.bottomButtonText}>주소 추가</Text>
  </TouchableOpacity>
);

export default BottomButton;
