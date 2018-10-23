import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import styles from '../styles';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { TextArea } from '../../components/Text';
import { colors, types } from '../../resources';
import { Navigation as NavAction } from '../../actions';

const SelectWithdrawAccount = () => (
  <View style={styles.container}>
    <AppStatusBar theme={StatusBarTheme.PURPLE} />
    <DefaultToolbar
      theme={DefaultToolbarTheme.PURPLE}
      data={{
        center: {
          title: '출금계좌 선택',
        },
        right: {
          actionText: '취소',
          action: NavAction.popScreen(),
        },
      }}
    />
    <ScrollView
      contentContainerStyle={styles.alignCenter}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.section}>
        <TextArea
          label={(
            <Text>
              <Text style={{ fontFamily: 'SpoqaHanSans-Bold' }}>어카운트이름기호</Text>
              <Text style={{ fontFamily: 'ZapfDingbatsITC' }}> ✈ </Text>
              <Text style={{ fontFamily: 'SpoqaHanSans-Bold' }}>공개 주소</Text>
            </Text>
          )}
          lableColor={colors.labelTextBlack}
          text="GBMILVZZSNAJ6KS2VXAWHNOYBJE2VUACRCKRHS4KLVQJAAN74MC5GDAUSD5XCNRRI6GJFH72V6HEOKE7EUBSSXOFKOUHCULWUCANUX24IYNX4ENH"
          underline={false}
        />
        <TextArea
          label="출금 가능 금액"
          text="3,100,000,000.2345678"
          type={types.TextArea.BALACNE}
          underline={false}
        />
      </View>
      <View style={styles.seperator} />
      <View style={styles.section}>
        <TextArea
          label={(<Text style={{ fontFamily: 'SpoqaHanSans-Bold' }}>여유자금</Text>)}
          lableColor={colors.labelTextBlack}
          text="GBMILVZZSNAJ6KS2VXAWHNOYBJE2VUACRCKRHS4KLVQJAAN74MC5GDAUSD5XCNRRI6GJFH72V6HEOKE7EUBSSXOFKOUHCULWUCANUX24IYNX4ENH"
          underline={false}
        />
        <TextArea
          label="출금 가능 금액"
          text="3,100,000,000.2345678"
          type={types.TextArea.BALACNE}
          underline={false}
        />
      </View>
    </ScrollView>
    <BottomButton
      actions={[
        { text: '확인' },
      ]}
    />
  </View>
);

SelectWithdrawAccount.navigationOptions = {
  header: null,
};

export default SelectWithdrawAccount;
