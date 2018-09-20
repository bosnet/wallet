import React from 'react';
import {
  View,
  ScrollView,
} from 'react-native';

import styles from '../styles';
import { colors, types } from '../../resources';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BalancePanel } from '../../components/Panel';
import { PanelButton, LongButton } from '../../components/Button';
import { ItemList } from '../../components/List';

const TransactionList = () => (
  <View style={styles.container}>
    <AppStatusBar theme={StatusBarTheme.WHITE} />
    <DefaultToolbar
      theme={DefaultToolbarTheme.WHITE}
      data={{
        left: {
          hasArrow: true,
          title: 'Account 2',
        },
        right: {
          actionText: '관리',
        },
      }}
    />
    <ScrollView
      contentContainerStyle={styles.alignCenter}
      showsVerticalScrollIndicator={false}
    >
      <BalancePanel
        text="3,200,000,000.2364938"
      />
      <PanelButton
        buttons={[
          {
            text: '보내기',
          },
          {
            text: '받기',
          },
          {
            text: '프로즌 계좌 만들기',
          },
        ]}
      />
      <ItemList
        listType={types.ListType.FLAT}
        listData={{
          data: [
            {
              accountName: 'Account 001 G4L',
              date: '2018.02.28   13:47',
              amount: '2,004,855,087.1234538',
              textColor: colors.itemTextRed,
              type: types.ListItem.TRANSACTION,
              key: '1',
            },
            {
              title: '계좌 생성',
              accountName: 'Account 001 G4L',
              date: '2018.02.28   13:47',
              textColor: colors.itemTextBlue,
              amount: '-538',
              type: types.ListItem.TRANSACTION,
              key: '2',
            },
          ],
        }}
      />
    </ScrollView>
  </View>
);

TransactionList.navigationOptions = {
  header: null,
};

export default TransactionList;
