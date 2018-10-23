import React from 'react';
import { View } from 'react-native';

import styles from '../styles';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { InfoPager } from '../../components/Pager';
import { BottomButton } from '../../components/Button';
import { Navigation as NavAction } from '../../actions';

import icKeep from '../../resources/images/ic_keep.png';
import icCare from '../../resources/images/ic_care.png';

const WarningScreen = () => (
  <View style={styles.container}>
    <AppStatusBar theme={StatusBarTheme.WHITE} />
    <DefaultToolbar
      theme={DefaultToolbarTheme.WHITE_LIGHT}
      data={{
        right: {
          actionText: '닫기',
          action: NavAction.popScreen(),
        },
      }}
    />
    <View style={styles.container}>
      <InfoPager
        data={[
          {
            headText: '중요한 정보는\n소중하게 보관하기',
            image: icKeep,
            size: {
              width: 116,
              height: 121,
            },
            contentText: '보안키, 복구키, 비밀번호를\n잃어버리거나 타인에게 공유하면\n당신의 귀한 자산을 모두 잃어버릴 수\n있어요!',
          },
          {
            headText: '항상 주변을\n잘 살피기',
            image: icCare,
            size: {
              width: 120,
              height: 126,
            },
            contentText: '혹시 Wallet을 사용 중에\n누군가 몰래 엿보지 않는지\n항상 주의를 기울여 주세요\n사용 후 반드시 앱을 종료해 주세요',
          },
        ]}
      />
    </View>
    <BottomButton
      actions={[
        {
          text: '당신만 아는 곳에 꼭꼭 숨겨두세요',
          action: NavAction.popScreen(),
        },
      ]}
    />
  </View>
);

WarningScreen.navigationOptions = {
  header: null,
};

export default WarningScreen;
