import React from 'react';
import { View, Text } from 'react-native';

import styles from '../styles';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { WithdrawablePanel, NotiPanel } from '../../components/Panel';
import { BalanceArea } from '../../components/Text';
import { InputText } from '../../components/Input';
import { colors } from '../../resources';

const SendBalance = () => (
  <View style={styles.container}>
    <AppStatusBar theme={StatusBarTheme.PURPLE} />
    <DefaultToolbar
      theme={DefaultToolbarTheme.PURPLE}
      data={{
        center: {
          title: '보내기',
        },
        right: {
          actionText: '닫기',
        },
      }}
    />
    <View style={styles.defaultLayout}>
      <WithdrawablePanel
        title="출금 가능 금액"
        amount="5,123,456,789.1234567"
      />
      <BalanceArea
        label="보낼 금액"
        subLabel="수수료 0.001 BOS"
        text="5,123,456,789.1234567"
        textColor={colors.textAreaContentsNavy}
      />
      <NotiPanel
        texts={[
          '보낼 금액을 입력하세요\n소수점 이하 7자리까지 입력 가능합니다',
        ]}
      />
      <InputText
        label={(<Text style={styles.textBold}>받는 계좌 공개주소</Text>)}
        labelColor={colors.labelTextBlack}
        placeholder="G로 시작하는 공개주소를 입력하세요"
        multiline
      />
      <NotiPanel
        texts={[
          '공개주소를 입력하세요',
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

SendBalance.navigationOptions = {
  header: null,
};

export default SendBalance;
