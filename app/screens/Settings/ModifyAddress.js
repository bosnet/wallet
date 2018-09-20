import React from 'react';
import { View } from 'react-native';

import styles from '../styles';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { InputText } from '../../components/Input';
import { NotiPanel } from '../../components/Panel';
import { TextArea, TextAreaOptions } from '../../components/Text';


const ModifyAddress = () => (
  <View style={styles.container}>
    <AppStatusBar theme={StatusBarTheme.PURPLE} />
    <DefaultToolbar
      theme={DefaultToolbarTheme.PURPLE}
      data={{
        center: {
          title: '주소 수정',
        },
        right: {
          actionText: '닫기',
        },
      }}
    />
    <View style={styles.defaultLayout}>
      <View style={[styles.layoutHead]} />
      <InputText
        label="이름"
      />
      <NotiPanel
        texts={['이름은 최소 1자 이상 최대 10자 이하 입력하세요']}
      />
      <TextArea
        label="공개 주소 이름 영역"
        option={{ type: TextAreaOptions.QR_CODE }}
        text="GBMILVZZSNAJ6KS2VXAWHNOYBJE2VUACRCKRHS4KLVQJAAN74MC5GDAUSD5XCNRRI6GJFH72V6HEOKE7EUBSSXOFKOUHCULWUCANUX24IYNX4ENH"
      />
      <View style={styles.filler} />
      <View style={styles.footer}>
        <NotiPanel
          texts={[
            '* 주소는 최대 100개까지 저장 가능합니다',
            '* BOS Wallet을 삭제하면 주소록에 저장된 정보는 모두 사라지\n며 복구할 수 없 습니다',
            '* 중요한 주소는 따로 안전한 곳에 보관해 주시기 바랍니다',
          ]}
        />
        <BottomButton
          actions={[
            { text: '확인' },
          ]}
        />
      </View>
    </View>

  </View>
);

ModifyAddress.navigationOptions = {
  header: null,
};

export default ModifyAddress;
