import React from 'react';
import { View } from 'react-native';

import styles from '../styles';
import { types } from '../../resources';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { ItemList } from '../../components/List';

const ManageScreen = () => (
  <View style={styles.container}>
    <AppStatusBar theme={StatusBarTheme.WHITE} />
    <DefaultToolbar
      theme={DefaultToolbarTheme.WHITE}
      data={{
        left: {
          hasArrow: true,
          title: '관리',
        },
      }}
    />
    <View style={styles.defaultLayout}>
      <ItemList
        listType={types.ListType.FLAT}
        listData={{
          data: [
            {
              key: '멤버십',
            },
            {
              key: '주소록',
            },
            {
              key: '계좌 순서',
            },
            {
              key: '언어',
            },
            {
              key: '투표 알림',
            },
          ],
        }}
      />
    </View>

  </View>
);

ManageScreen.navigationOptions = {
  header: null,
};

export default ManageScreen;
