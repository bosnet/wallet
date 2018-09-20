import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import styles from '../../styles';

import { BottomButton, CheckBox } from '../../../components/Button';
import { NotiPanel } from '../../../components/Panel';
import { InputText, InputTextOptions } from '../../../components/Input';
import { colors } from '../../../resources';
import { TextArea, LabelText } from '../../../components/Text';

const InputAccounts = () => (
  <ScrollView
    contentContainerStyle={styles.alignCenter}
    showsVerticalScrollIndicator={false}
  >
    <InputText
      label={(<Text style={styles.textBold}>공개주소</Text>)}
      labelColor={colors.labelTextBlack}
      placeholder="G로 시작하는 공개주소 56자를 입력하세요"
      option={{ type: InputTextOptions.QR_CODE }}
      multiline
    />
    <LabelText
      text={(
        <Text>
          <Text style={{ fontWeight: 'bold' }}>최근송금내역</Text>
        </Text>
      )}
    />
    <TextArea
      label="어카운트 이름 기호"
      text="GBMILVZZSNAJ6KS2VXAWHNOYBJE2VUACRCKRHS4KLVQJAAN74MC5GDAUSD5XCNRRI6GJFH72V6HEOKE7EUBSSXOFKOUHCULWUCANUX24IYNX4ENH"
    />
    <TextArea
      label="홍양꽁냥"
      text="GBMILVZZSNAJ6KS2VXAWHNOYBJE2VUACRCKRHS4KLVQJAAN74MC5GDAUSD5XCNRRI6GJFH72V6HEOKE7EUBSSXOFKOUHCULWUCANUX24IYNX4ENH"
    />
    <TextArea
      label="홍양꽁냥"
      text="GBMILVZZSNAJ6KS2VXAWHNOYBJE2VUACRCKRHS4KLVQJAAN74MC5GDAUSD5XCNRRI6GJFH72V6HEOKE7EUBSSXOFKOUHCULWUCANUX24IYNX4ENH"
    />
    <View style={{ marginBottom: 10 }} />
    <View style={styles.filler} />
    <BottomButton
      actions={[
        { text: '선택' },
      ]}
    />
  </ScrollView>
);

InputAccounts.navigationOptions = {
  header: null,
};

export default InputAccounts;
