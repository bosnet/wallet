import React from 'react';
import { View } from 'react-native';

import styles from '../styles';
import { types } from '../../resources';

import { ItemList } from '../../components/List';
import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';

const MembershipScreen = () => (
  <View style={styles.container}>
    <AppStatusBar theme={StatusBarTheme.PURPLE} />
    <DefaultToolbar
      theme={DefaultToolbarTheme.PURPLE}
      data={{
        center: {
          title: '멤버십',
        },
        right: {
          actionText: '닫기',
        },
      }}
    />
    <View style={styles.defaultLayout}>
      <ItemList
        listType={types.ListType.FLAT}
        listData={{
          data: [
            {
              key: 'PIN 변경',
            },
            {
              key: '얼굴 재등록',
            },
            {
              key: '멤버십 탈퇴',
            },
            {
              key: '문의하기',
            },
          ],
        }}
      />
    </View>
  </View>
);

MembershipScreen.navigationOptions = {
  header: null,
};

export default MembershipScreen;
