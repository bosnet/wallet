import React from 'react';
import { Text, View } from 'react-native';

import styles from '../styles';

const TestScreen = () => (
  <View style={styles.container}>
    <View>
      <Text>Welcome to React Native!</Text>
      <Text>To get started, edit App.js</Text>
    </View>
  </View>
);

TestScreen.navigationOptions = {
  header: null,
};

export default TestScreen;
