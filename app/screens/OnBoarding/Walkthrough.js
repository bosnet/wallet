import React from 'react';
import { View } from 'react-native';

import styles from '../styles';

import { Navigation } from '../../actions';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { InfoPager } from '../../components/Pager';
import { BottomButton } from '../../components/Button';

import icWallet from '../../resources/images/ic_wallet.png';
import icJoin from '../../resources/images/ic_join.png';

const Walkthrough = () => (
  <View style={styles.container}>
    <AppStatusBar theme={StatusBarTheme.WHITE} />
    <DefaultToolbar
      theme={DefaultToolbarTheme.WHITE_LIGHT}
    />
    <View style={styles.container}>
      <InfoPager
        data={[
          {
            headText: '송금 즉시 확인 가능한\n빠른 Wallet 경험하기',
            image: icWallet,
            size: {
              width: 151,
              height: 119,
            },
            contentText: '주소록에 저장된 친구의 공개 주소로\n쉽고 빠르게 BOScoin을 보내보세요',
          },
          {
            headText: '멤버십에 가입하고\n의사결정에 참여하기',
            image: icJoin,
            size: {
              width: 159,
              height: 141,
            },
            contentText: 'BOS 멤버십에 가입하여\n의회 의사결정에 직접 참여하고\n멤버십 리워드도 받아가세요',
          },
        ]}
      />
      <BottomButton
        actions={[
          {
            text: 'BOScoin Wallet 시작하기',
            action: Navigation.resetScreen(Navigation.Screens.HOME),
          },
        ]}
      />
    </View>
  </View>
);

Walkthrough.navigationOptions = {
  header: null,
};

export default Walkthrough;
