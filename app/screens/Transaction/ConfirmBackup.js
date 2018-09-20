import React from 'react';
import { View } from 'react-native';

import styles from '../styles';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { AlertPanel, NotiPanel } from '../../components/Panel';

import icTrash from '../../resources/images/ic_success.png';

const ConfirmBackup = () => (
  <View style={styles.container}>
    <AppStatusBar theme={StatusBarTheme.PURPLE} />
    <DefaultToolbar
      theme={DefaultToolbarTheme.PURPLE}
      data={{
        center: {
          title: '백업확인',
        },
        right: {
          actionText: '취소',
        },
      }}
    />
    <View style={styles.centerLayout}>
      <AlertPanel
        icon={icTrash}
        text={
          '보안키, 복구키, 비밀번호를\n'
          + '모두 안전한 곳에 보관하셨나요?'
        }
      />
      <View style={styles.fixBottom}>
        <NotiPanel
          texts={[
            '* 보안키, 복구키, 비밀번호를 안전한 곳에 보관하지 않은 상태에'
            + '\n   서 계좌를 삭제할 경우 계좌 내 모든 보스코인을 통제할 수 없게'
            + '\n   됩니다!',
          ]}
        />
      </View>
    </View>
    <BottomButton
      actions={[
        { text: '확인' },
      ]}
    />
  </View>
);

ConfirmBackup.navigationOptions = {
  header: null,
};

export default ConfirmBackup;
