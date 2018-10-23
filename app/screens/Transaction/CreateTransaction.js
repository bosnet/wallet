import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import styles from '../styles';


import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { colors, types } from '../../resources';
import { TextArea, TextAreaOptions } from '../../components/Text';

const CreateTransaction = ({ navigation }) => {
  const data = navigation.getParam('data', null);

  return (
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
          {() => {
            if (data.status === 200) return '트랜잭션이 생성되었습니다';
            if (data.status === 500) return `트랜잭션 실패 - ${data.title}`;
            return null;
          }}
        </Text>
        <TextArea
          label="트랜잭션 아이디"
          text={data.transactionId}
          underline={false}
        />
        <TextArea
          label="받는 계좌 공개 주소"
          text={data.target}
          underline={false}
        />
        <TextArea
          label="보낸 금액"
          text={data.amount}
          type={types.TextArea.BALACNE}
          underline={false}
        />
        <TextArea
          label="수수료"
          text={data.fee ? data.fee : '0'}
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
          { text: '확인' },
          { text: '주소록추가' },
        ]}
      />
    </View>
  );
};

CreateTransaction.navigationOptions = {
  header: null,
};

export default CreateTransaction;
