import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
// import PropTypes from 'prop-types';

import styles from './styles';

import icRefresh from '../../resources/images/ic_refresh.png';

const LoadingPanel = ({ text, subText }) => (
  <View style={styles.loadingPanel}>
    <View style={styles.loadingTextArea}>
      <Text style={styles.loadingTitle}>{text}</Text>
      <Text style={styles.loadingSubText}>{subText}</Text>
    </View>
    <TouchableOpacity style={{ padding: 5 }}>
      <Image style={styles.loadingRefreshIcon} source={icRefresh} />
    </TouchableOpacity>
  </View>
);

export default LoadingPanel;
