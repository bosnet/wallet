import React from 'react';
import { View, ScrollView } from 'react-native';

import styles from '../styles';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { AddressPanel, NotiPanel } from '../../components/Panel';
import { TextArea } from '../../components/Text';
import { BottomButton, ButtonGroup, IconButton } from '../../components/Button';

import iconSend from '../../resources/images/ic_send.png';
import iconCopy from '../../resources/images/icon_copy.png';
import iconModify from '../../resources/images/ic_modify.png';
import iconDel from '../../resources/images/ic_del.png';


const AddressBook = () => (
  <View style={styles.container}>
    <AppStatusBar theme={StatusBarTheme.PURPLE} />
    <DefaultToolbar
      theme={DefaultToolbarTheme.PURPLE}
      data={{
        center: {
          title: '주소록',
        },
        right: {
          actionText: '닫기',
        },
      }}
    />
    <View style={styles.defaultLayout}>
      <AddressPanel
        count={20}
      />
      <ScrollView
        contentContainerStyle={styles.alignCenter}
        showsVerticalScrollIndicator={false}
      >
        <NotiPanel
          texts={[
            '* BOS Wallet을 삭제하면 주소록에 저장된 정보는 모두 사라지\n'
            + '   며 복구할 수 없습니다',
            '* 중요한 주소는 따로 안전한 곳에 보관해 주시기 바랍니다!',
          ]}
        />
        <TextArea
          label="여유 자금"
          text={'QIUEOPVKA@FDJKSAL.NET\nRNVMCZX,NVM,_JDKA@DJAKL.COM'}
        />
        <TextArea
          label="공개 주소 이름"
          text="GBMILVZZSNAJ6KS2VXAWHNOYBJE2VUACRCKRHS4KLVQJAAN74MC5GDAUSD5XCNRRI6GJFH72V6HEOKE7EUBSSXOFKOUHCULWUCANUX24IYNX4ENH"
        />
        <ButtonGroup>
          <IconButton
            icon={iconSend}
            label="보내기"
          />
          <IconButton
            icon={iconCopy}
            label="복사"
          />
          <IconButton
            icon={iconModify}
            label="수정"
          />
          <IconButton
            icon={iconDel}
            label="삭제"
          />
        </ButtonGroup>
      </ScrollView>
    </View>
    <BottomButton
      actions={[
        { text: '주소 추가' },
      ]}
    />
  </View>
);

AddressBook.navigationOptions = {
  header: null,
};

export default AddressBook;
