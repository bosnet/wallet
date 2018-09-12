import React from 'react';
import { ToolbarAndroid } from 'react-native';
import PropTypes from 'prop-types';

import { strings } from '../../res/index';
import styles from './styles';

import logo from '../../res/images/bos-wallet.png';
import toolbarAdd from '../../res/images/icon-add.png';
import toolbarIn from '../../res/images/icon-in.png';
import toolbarSetting from '../../res/images/icon-setting.png';

const HomeToolbar = ({ onActionSelected }) => (
  <ToolbarAndroid
    logo={logo}
    style={styles.homeToolbar}
    actions={[
      { title: strings.Toolbar.add, icon: toolbarAdd, show: 'always' },
      { title: strings.Toolbar.in, icon: toolbarIn, show: 'always' },
      { title: strings.Toolbar.settings, icon: toolbarSetting, show: 'always' },
    ]}
    onActionSelected={onActionSelected}
  />
);

HomeToolbar.propTypes = {
  onActionSelected: PropTypes.func.isRequired,
};

export default HomeToolbar;
