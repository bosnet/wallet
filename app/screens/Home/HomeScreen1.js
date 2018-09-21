import React from 'react';
import { View, ScrollView } from 'react-native';

import styles from '../styles';
import { colors, types } from '../../resources';

import { Theme, AppStatusBar } from '../../components/StatusBar';
import { HomeToolbar } from '../../components/Toolbar';
import { BannerPager } from '../../components/Pager';
import { ItemList } from '../../components/List';
import { BalanceArea } from '../../components/Text';

const HomeScreen = () => (
  <View style={styles.container}>
    <AppStatusBar theme={Theme.WHITE} />
    <HomeToolbar />
    <View style={[styles.container]}>
      <BannerPager
        data={[
          {
            text: 'Freezing Reward 를 지급해 주세요.',
            color: colors.cardPurple,
          },
          {
            text: 'Freezing Reward 를 지급해 주세요2.',
            color: colors.cardOrange,
          },
          {
            text: 'Freezing Reward 를 지급해 주세요3.',
            color: colors.cardPurple,
          },
        ]}
      />
      <BalanceArea
        label="TOTAL BALANCE"
        lableColor={colors.itemTextLightGray}
        text="5,300,000,000.2349876"
        textColor={colors.textAreaContentsNavy}
      />
      <ScrollView
        contentContainerStyle={styles.alignCenter}
        showsVerticalScrollIndicator={false}
      >
        <ItemList
          listType={types.ListType.FLAT}
          listData={{
            data: [
              {
                key: '1',
                type: types.ListItem.ACCOUNT,
                name: 'Wise Investment',
                icon: 'voting',
                freezing: true,
                amount: '8,200,000,000.49385234',
              },
              {
                key: '2',
                type: types.ListItem.ACCOUNT,
                name: 'Wise Investment',
                amount: '8,200,000,000.49385234',
              },
            ],
          }}
        />
      </ScrollView>
    </View>
  </View>
);

HomeScreen.navigationOptions = {
  header: null,
};

export default HomeScreen;
