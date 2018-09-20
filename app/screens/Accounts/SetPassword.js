import React from 'react';
import { View, Text } from 'react-native';

import styles from '../styles';


import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { NotiPanel } from '../../components/Panel';
import { InputPassword } from '../../components/Input';
import { colors } from '../../resources';

const SetPassword = () => (
  <View style={styles.container}>
    <AppStatusBar theme={StatusBarTheme.PURPLE} />
    <DefaultToolbar
      theme={DefaultToolbarTheme.PURPLE}
      data={{
        center: {
          title: '비밀번호 설정',
        },
      }}
    />
    <View style={styles.defaultLayout}>
      <Text style={[styles.layoutHead, styles.headText]}>
        이 계좌의 비밀번호를 설정해 주세요
      </Text>
      <InputPassword
        label="새 비밀번호 입력"
      />
      <NotiPanel
        texts={[
          '비밀번호는 영문(대/소문자), 숫자, 특수 문자 포함 8자이상 입니\n다',
        ]}
      />
      <InputPassword
        label="새 비밀번호 재입력"
        placeholder="비밀번호를 다시 한번 더 입력해 주세요"
      />
      <NotiPanel
        texts={[
          '비밀번호를 입력하세요',
        ]}
        color={colors.alertTextRed}
      />
      <View style={styles.filler} />
      <View style={styles.footer}>
        <NotiPanel
          texts={[
            '* 비밀번호를 변경하게 되면, 기존의 복구키는 사용하실 수 없습\n   니다',
            '* 비밀번호 변경 완료 후 새로운 복구키를 안전한 곳에 저장해 주\n   시기 바랍니다',
          ]}
        />
      </View>
      <BottomButton
        actions={[
          { text: '확인' },
        ]}
        inactive
      />
    </View>

  </View>
);

SetPassword.navigationOptions = {
  header: null,
};

export default SetPassword;
