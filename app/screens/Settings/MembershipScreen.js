import React from 'react';
import { Text, View } from 'react-native';

import styles from '../styles';

import { Type, AppStatusBar } from '../../components/StatusBar';
import { HomeToolbar } from '../../components/Toolbar';

const MembershipScreen = () => (
  <View style={styles.container}>
    <AppStatusBar type={Type.PURPLE} />
    <HomeToolbar />
    <View style={styles.defaultLayout}>

    </View>
  </View>
);

MembershipScreen.navigationOptions = {
  header: null,
};

export default MembershipScreen;
