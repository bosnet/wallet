import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import styles from '../styles';


import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { InputText, InputTextOptions, InputPassword } from '../../components/Input';
import { NotiPanel } from '../../components/Panel';
import { BottomButton } from '../../components/Button';
import { colors } from '../../resources';

const ImportByRestore = () => (
  <View style={styles.container}>
    <AppStatusBar theme={StatusBarTheme.PURPLE} />
    <DefaultToolbar
      theme={DefaultToolbarTheme.PURPLE}
      data={{
        center: {
          title: '계좌 가져오기',
        },
        right: {
          actionText: '취소',
        },
      }}
    />
    <View style={styles.defaultLayout}>

      <ScrollView
        contentContainerStyle={styles.alignCenter}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.layoutHead, styles.headText]}>
          가져올 계좌의 복구키를 입력해 주세요
        </Text>
        <InputText
          label="복구키"
          option={{ type: InputTextOptions.QR_CODE }}
          multiline
        />
        <NotiPanel
          texts={[
            'B로 시작하는 복구키를 입력해 주세요',
          ]}
        />
        <InputPassword
          label="비밀번호"
          placeholder="이 계좌의 비밀번호 입력해 주세요"
        />
        <NotiPanel
          texts={[
            '비밀번호는 영문(대/소문자), 숫자, 특수 문자 포함 8자이상 입니\n다',
          ]}
        />
        <View style={styles.filler} />
        <View style={styles.footer}>
          <NotiPanel
            texts={[
              '* 비밀번호는 본인 외에 아무도 알 수 없습니다',
              '* 이 계좌의 비밀번호를 모를 경우 복구키로 계좌를 가져올 수 없\n'
              + '   으오니, 보안키를 이용하여 계좌 가져오기를 시도해 주시기 바\n'
              + '   랍니다',
            ]}
          />
        </View>
        <BottomButton
          actions={[
            { text: '다음' },
          ]}
          inactive
        />
      </ScrollView>
    </View>
  </View>
);

ImportByRestore.navigationOptions = {
  header: null,
};

export default ImportByRestore;
