import React from 'react';
import {
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const NoticeText = ({ text }) => <Text style={styles.noticeText}>{text}</Text>;

export default NoticeText;
