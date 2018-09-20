import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import styles from '../styles';


import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { colors, types } from '../../resources';
import { TextArea, TextAreaOptions } from '../../components/Text';

const CreateTransaction = () => (
  <View style={styles.container}>
    <AppStatusBar theme={StatusBarTheme.PURPLE} />
    <DefaultToolbar
      theme={DefaultToolbarTheme.PURPLE}
      data={{
        center: {
          title: '송금 요청 생성',
        },
      }}
    />
    <ScrollView
      contentContainerStyle={styles.alignCenter}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.layoutHead, styles.headText]}>
        트랜잭션이 생성되었습니다
      </Text>
      <TextArea
        label="트랜잭션 아이디"
        text="a62a764e0cae0cb403c9de395f3e6c3106b69f0cceb19df676691ac1c99b3e3a"
        underline={false}
      />
      <TextArea
        label="받는 계좌 공개 주소"
        text="GBMILVZZSNAJ6KS2VXAWHNOYBJE2VUACRCKRHS4KLVQJAAN74MC5GDAUSD5XCNRRI6GJFH72V6HEOKE7EUBSSXOFKOUHCULWUCANUX24IYNX4ENH"
        underline={false}
      />
      <TextArea
        label="보낸 금액"
        text="3,100,000,000.2345678"
        type={types.TextArea.BALACNE}
        underline={false}
      />
      <TextArea
        label="수수료"
        text="3,100,000,000.2345678"
        type={types.TextArea.BALACNE}
        underline={false}
      />
      <TextArea
        label="총액"
        text="1,299,990,000"
        type={types.TextArea.BALACNE}
        underline={false}
      />
      <View style={styles.filler} />
    </ScrollView>
    <BottomButton
      actions={[
        { text: '송금' },
        { text: '주소록추가' },
      ]}
    />
  </View>
);

CreateTransaction.navigationOptions = {
  header: null,
};

export default CreateTransaction;
