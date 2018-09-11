import React from 'react';
import { ToolbarAndroid } from 'react-native';

import styles from './styles';
import strings from '../../res/strings';

import logo from '../../res/images/bos-wallet.png';
import iconAdd from '../../res/images/icon-add.png';
import iconIn from '../../res/images/icon-in.png';
import iconSetting from '../../res/images/icon-setting.png';

const HomeToolbar = prop => (
  <ToolbarAndroid
    logo={logo}
    style={styles.homeToolbar}
    actions={[
      { title: strings.HomeToolbar.add, icon: iconAdd, show: 'always' },
      { title: strings.HomeToolbar.in, icon: iconIn, show: 'always' },
      { title: strings.HomeToolbar.settings, icon: iconSetting, show: 'always' },
    ]}
    onActionSelected={prop.onActionSelected}
  />
);

export default HomeToolbar;
