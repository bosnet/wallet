import React from 'react';
import { ScrollView, View } from 'react-native';

import styles from '../styles';
import { types } from '../../resources';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';

import { ItemList } from '../../components/List';

const SettingsScreen = () => (
  <View style={styles.container}>
    <AppStatusBar theme={StatusBarTheme.WHITE} />
    <DefaultToolbar
      theme={DefaultToolbarTheme.WHITE}
      data={{
        left: {
          hasArrow: true,
          title: '설정',
        },
      }}
    />
    <ScrollView
      contentContainerStyle={styles.alignCenter}
      showsVerticalScrollIndicator={false}
    >
      <ItemList
        listType={types.ListType.SECTION}
        listData={{
          data: [
            {
              title: '멤버십 리워드',
              // data: [
              //   '멤버십',
              //   '주소록',
              //   '계좌 순서',
              //   '언어',
              //   '투표 알림',
              // ],
              data: [
                {
                  text: '멤버십',
                },
                {
                  text: '주소록',
                },
                {
                  text: '계좌 순서',
                },
                {
                  text: '언어',
                  type: types.ListItem.OPTION_TEXT,
                  value: '한국어',
                },
                {
                  text: '투표 알림',
                  type: types.ListItem.TOGGLE,
                },
              ],
            },
            {
              title: '정보',
              // data: [
              //   'FAQ',
              //   '주의사항',
              //   '오픈소스 라이센스',
              //   '버전',
              // ],
              data: [
                {
                  text: 'FAQ',
                  type: types.ListItem.EX_LINK,
                },
                {
                  text: '주의사항',
                },
                {
                  text: '오픈소스 라이센스',
                },
                {
                  text: '버전',
                  type: types.ListItem.OPTION_TEXT,
                  value: 'v 0.1',
                },
              ],
            },
          ],
        }}
      />
    </ScrollView>
  </View>
);

SettingsScreen.navigationOptions = {
  header: null,
};

export default SettingsScreen;
