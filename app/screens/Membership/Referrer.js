import React from 'react';
import { View, Text } from 'react-native';

import styles from '../styles';


import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton, CheckBox } from '../../components/Button';
import { NotiPanel } from '../../components/Panel';
import { InputText, InputTextOptions } from '../../components/Input';
import { colors } from '../../resources';

const Referrer = () => (
  <View style={styles.container}>
    <AppStatusBar theme={StatusBarTheme.PURPLE} />
    <DefaultToolbar
      theme={DefaultToolbarTheme.PURPLE}
      data={{
        center: {
          title: '추천인 공개 주소 입력',
        },
        right: {
          actionText: '취소',
        },
      }}
    />
    <View style={styles.defaultLayout}>
      <Text style={[styles.layoutHead, styles.headText]}>
        {
          '보스코인 멤버십을 추천한 사람이 있다면\n'
          + '추천인 공개 주소를 입력하세요\n'
          + '추천한 사람과 귀하 모두에게\n'}
        <Text style={styles.textBold}>리워드</Text>
        로
        <Text style={styles.textBold}>500 BOS</Text>
        가
        <Text style={styles.textBold}>
        지급
        </Text>
        됩니다
      </Text>
      <InputText
        label={(<Text style={styles.textBold}>공개 주소</Text>)}
        labelColor={colors.labelTextBlack}
        placeholder="G로 시작하는 공개 주소 56자를 입력하세요"
        option={{ type: InputTextOptions.QR_CODE }}
        multiline
      />
      <NotiPanel
        texts={[
          'G로 시작하는 공개 주소 56자를 입력하세요',
        ]}
      />
      <CheckBox
        label="추천인이 없습니다"
      />
      <View style={styles.filler} />
      <BottomButton
        actions={[
          { text: '다음' },
        ]}
      />
    </View>

  </View>
);

Referrer.navigationOptions = {
  header: null,
};

export default Referrer;
