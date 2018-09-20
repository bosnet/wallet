import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import styles from '../styles';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { ItemList } from '../../components/List';
import { AlertPanel } from '../../components/Panel';

import icEmpty from '../../resources/images/empty.png';
import { colors, types } from '../../resources';

const createLayout = (data) => {
  let returnLayout = null;
  if (!data || data.length === 0) {
    returnLayout = (
      <View style={styles.centerLayout}>
        <AlertPanel
          icon={icEmpty}
          color={colors.alertTextLightGrey}
          text={
            '아직 등록된\n'
            + 'Account가 없습니다'
          }
        />
      </View>
    );
  }

  return returnLayout;
};

const SortAccounts = ({ accounts }) => (
  <View style={styles.container}>
    <AppStatusBar theme={StatusBarTheme.PURPLE} />
    <DefaultToolbar
      theme={DefaultToolbarTheme.PURPLE}
      data={{
        center: {
          title: 'Account 순서 변경',
        },
        right: {
          actionText: '닫기',
        },
      }}
    />
    <View style={styles.defaultLayout}>
      {createLayout(accounts)}
    </View>
  </View>
);
//    {createLayout(accounts)}


SortAccounts.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({ accounts: state.accounts });

export default connect(mapStateToProps)(SortAccounts);
