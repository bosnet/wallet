import React from 'react';
import { View, Text } from 'react-native';

import styles from '../styles';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { TextArea, LabelText } from '../../components/Text';
import { colors } from '../../resources';
import { QRPanel } from '../../components/Panel';

import imgQR from '../../resources/images/qr.png';

const ReceiveBalance = () => (
  <View style={styles.container}>
    <AppStatusBar theme={StatusBarTheme.PURPLE} />
    <DefaultToolbar
      theme={DefaultToolbarTheme.PURPLE}
      data={{
        center: {
          title: '받기',
        },
        right: {
          actionText: '닫기',
        },
      }}
    />
    <View style={styles.defaultLayout}>
      <View style={styles.section}>
        <TextArea
          label={(
            <Text>
              <Text style={{ fontWeight: 'bold' }}>어카운트이름기호</Text>
              <Text style={{ fontFamily: 'ZapfDingbatsITC' }}> ✈ </Text>
              <Text style={{ fontWeight: 'bold' }}>공개 주소</Text>
            </Text>
          )}
          lableColor={colors.labelTextBlack}
          text="GBMILVZZSNAJ6KS2VXAWHNOYBJE2VUACRCKRHS4KLVQJAAN74MC5GDAUSD5XCNRRI6GJFH72V6HEOKE7EUBSSXOFKOUHCULWUCANUX24IYNX4ENH"
          underline={false}
        />
      </View>
      <View style={styles.seperator} />
      <View style={styles.section}>
        <LabelText
          text={(
            <Text>
              <Text style={{ fontWeight: 'bold' }}>어카운트이름기호</Text>
              <Text style={{ fontFamily: 'ZapfDingbatsITC' }}> ✈ </Text>
              <Text style={{ fontWeight: 'bold' }}>QR CODE</Text>
            </Text>
          )}
        />
        <QRPanel
          img={imgQR}
        />
      </View>
    </View>
    <BottomButton
      actions={[
        { text: '공유' },
        { text: '복사' },
      ]}
    />
  </View>
);

ReceiveBalance.navigationOptions = {
  header: null,
};

export default ReceiveBalance;
