import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from '../styles';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';

import imgFace from '../../resources/images/img_face.png';

const QRScan = ({ callback }) => (
  <View style={styles.container}>
    <AppStatusBar theme={StatusBarTheme.WHITE} />
    <View style={[styles.container, styles.noToolbar, { backgroundColor: '#999999' }]}>
      <Text style={[styles.layoutHead, styles.headText]}>
        바코드를 사각형 안에 비춰주세요
      </Text>
      <View style={styles.centerLayout}>
        <Image
          source={imgFace}
          resizeMode="contain"
          style={{ width: 292 }}
        />
      </View>

    </View>
  </View>
);

QRScan.navigationOptions = {
  header: null,
};

export default QRScan;
