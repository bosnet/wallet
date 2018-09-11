import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import WhiteStatusBar from '../components/StatusBar/WhiteStatusBar';
import HomeToolBar from '../components/Toolbar/HomeToolbar';
import styles from './styles';
import strings from '../res/strings';

const HomeScreen = ({ navigation }) => {
  const onActionSelected = (position) => {
    if (position === 2) { // index of 'Settings'
      // navigation('Settings');
      navigation.dispatch({ type: strings.nav.Settings });
    }
  };
  return (
    <View style={styles.defaultLayout}>
      <WhiteStatusBar />
      <HomeToolBar onActionSelected={onActionSelected} />
      <Text>
        Open up App2.js to start working on your app!
      </Text>
      <Text>Changes you make will automatically reload.</Text>
      <Text>Shake your phone to open the developer menu.</Text>
    </View>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,//추후 화면나오면 redux로 변경
};

HomeScreen.navigationOptions = {
  header: null,
};

export default HomeScreen;
