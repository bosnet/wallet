import React from 'react';
import { View, ScrollView } from 'react-native';

import styles from '../styles';
import { colors, types } from '../../resources';

import { LongButton } from '../../components/Button';
import { Theme, AppStatusBar } from '../../components/StatusBar';
import { HomeToolbar } from '../../components/Toolbar';
import { LoadingPanel } from '../../components/Panel';
import { ItemList } from '../../components/List';
import { BalanceArea } from '../../components/Text';

const HomeScreen = () => (
  <View style={styles.container}>
    <AppStatusBar theme={Theme.WHITE} />
    <HomeToolbar />
    <View style={[styles.container]}>
      <LoadingPanel
        text="네트워크 동기화 중"
        subText="52초"
      />
      <BalanceArea
        label="TOTAL BALANCE"
        lableColor={colors.itemTextLightGray}
        text="0"
        textColor={colors.textAreaContentsNavy}
      />
      <ScrollView
        contentContainerStyle={styles.alignCenter}
        showsVerticalScrollIndicator={false}
      >
        <ItemList
          listType={types.ListType.FLAT}
          listData={{
            data: [],
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
