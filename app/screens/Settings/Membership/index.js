import React from 'react';
import { View, Text } from 'react-native';

import WhiteStatusBar from '../../../components/StatusBar/WhiteStatusBar';
import styles from '../../styles';

const Membership = () => {
  const state = null;
  return (
    <View style={styles.defaultLayout}>
      <WhiteStatusBar />
      <Text>
        Open up Membership to start working on your app!
      </Text>
      <Text>Changes you make will automatically reload.</Text>
      <Text>Shake your phone to open the developer menu.</Text>
    </View>
  );
};

Membership.navigationOptions = {
  header: null,
};

export default Membership;
