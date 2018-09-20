import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import styles from '../styles';
import { types } from '../../resources';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { TextArea, LabelText } from '../../components/Text';

import icCopy from '../../resources/images/ic_list_copy.png';

const TransactionDetail = () => (
  <View style={styles.container}>
    <AppStatusBar theme={StatusBarTheme.WHITE} />
    <DefaultToolbar
      theme={DefaultToolbarTheme.WHITE}
      data={{
        left: {
          hasArrow: true,
          title: '거래상세내역',
        },
      }}
    />
    <View style={styles.defaultLayout}>
      <ScrollView
        contentContainerStyle={styles.alignCenter}
        showsVerticalScrollIndicator={false}
      >
        <TextArea
          label="거래 시각"
          text="2018.02.27 13:22"
          underline={false}
        />
        <TextArea
          label="거래 구분"
          text="프리징"
          underline={false}
        />
        <TextArea
          label="트랜잭션 아이디"
          text="a62a764e0cae0cb403c9de395f3e6c3106b69f0cceb19df676691ac1c99b3e3a"
          underline={false}
        />
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <LabelText
            text="받는 계좌"
          >
            <TouchableOpacity>
              <Image
                style={{
                  width: 20,
                  height: 20,
                }}
                source={icCopy}
              />
            </TouchableOpacity>
          </LabelText>
        </View>
        <TextArea
          label="Account 001 G4L"
          text="GBMILVZZSNAJ6KS2VXAWHNOYBJE2VUACRCKRHS4KLVQJAAN74MC5GDAUSD5XCNRRI6GJFH72V6HEOKE7EUBSSXOFKOUHCULWUCANUX24IYNX4ENH"
          underline={false}
        />
        <TextArea
          label="보낸금액"
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
        <View style={{ marginBottom: 30 }} />
      </ScrollView>
      <BottomButton
        actions={[
          { text: '확인' },
          { text: '익스플로러' },
        ]}
      />
    </View>
  </View>
);

TransactionDetail.navigationOptions = {
  header: null,
};

export default TransactionDetail;
