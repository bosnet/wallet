import React from 'react';
import { View } from 'react-native';

import styles from '../styles';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { AlertPanel, InfoPanel } from '../../components/Panel';
import { LabelText } from '../../components/Text';

import icWarning from '../../resources/images/ic_warning_1.png';
import { colors } from '../../resources';

const ConfirmBackup = () => (
  <View style={styles.container}>
    <AppStatusBar theme={StatusBarTheme.PURPLE} />
    <DefaultToolbar
      theme={DefaultToolbarTheme.PURPLE}
      data={{
        center: {
          title: '멤버십 탈퇴 안내',
        },
        right: {
          actionText: '닫기',
        },
      }}
    />
    <View style={styles.centerLayout}>
      <AlertPanel
        icon={icWarning}
        highlight="잠깐!"
        text={
          'Membership Account를 삭제하면\n'
          + '더이상 멤버쉽 혜택을 누릴 수 없습니다'
        }
      />
    </View>
    <View style={styles.footer}>
      <LabelText
        text="멤버십 혜택"
        bold
        color={colors.labelTextBlack}
      />
      <InfoPanel />
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
