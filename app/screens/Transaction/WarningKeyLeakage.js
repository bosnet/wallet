import React from 'react';
import { View } from 'react-native';

import styles from '../styles';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { AlertPanel, NotiPanel } from '../../components/Panel';

import icWarning from '../../resources/images/ic_warning_1.png';

const ConfirmBackup = () => (
  <View style={styles.container}>
    <AppStatusBar theme={StatusBarTheme.PURPLE} />
    <DefaultToolbar
      theme={DefaultToolbarTheme.PURPLE}
      data={{
        center: {
          title: '보안키 유출 주의',
        },
        right: {
          actionText: '취소',
        },
      }}
    />
    <View style={styles.centerLayout}>
      <AlertPanel
        icon={icWarning}
        text={
          '보안키를 잃어버리거나\n'
          + '타인에게 누출이 될 경우\n'
          + '이 계좌에 있는 모든 코인을\n'
          + '도난 당하게 됩니다\n'
          + '보안키 보안에 각별히\n'
          + '신경써 주시기 바랍니다'
        }
      />
    </View>
    <View style={styles.footer}>
      <NotiPanel
        texts={[
          '* 보안키는 계좌를 가져올 때 사용됩니다',
          '* 보안키, 복구키, 비밀번호는 본인 외에는 아무도 알 수 없으니,'
          + '   반드시 잘 보관해 주시기 바랍니다',
        ]}
      />
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
