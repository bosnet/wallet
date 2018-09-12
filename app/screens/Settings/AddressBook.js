import React from 'react';
import { View, ScrollView } from 'react-native';

import PurpleStatusBar from '../../components/StatusBar/PurpleStatusBar';
import PurpleToolbar from '../../components/Toolbar/PurpleToolbar';
import AddressPanel from '../../components/Panel/AddressPanel';
import BottomButton from '../../components/Button/BottomButton';
import ButtonGroup from '../../components/Button/ButtonGroup';
import IconButton from '../../components/Button/IconButton';
import LabeledArea from '../../components/TextArea/LabeledArea';
import NoticeArea from '../../components/TextArea/NoticeArea';
import NoticeText from '../../components/TextArea/NoticeText';

import styles from '../styles';
import { strings } from '../../res/index';

import iconSend from '../../res/images/ic_send.png';
import iconCopy from '../../res/images/icon_copy.png';
import iconModify from '../../res/images/ic_modify.png';
import iconDel from '../../res/images/ic_del.png';

const AddressBook = () => (
  <View style={styles.container}>
    <PurpleStatusBar />
    <PurpleToolbar
      title={strings.Settings.titleAddressBook}
      backText={strings.Toolbar.close}
    />
    <View style={styles.defaultLayout}>
      <AddressPanel />
      <ScrollView>
        <NoticeArea>
          <NoticeText
            text={'* BOS Wallet을 삭제하면 주소록에 저장된 정보는 모두 사라지'
            + '\n   '
            + '며 복구할 수 없습니다'}
          />
          <NoticeText
            text="* 중요한 주소는 따로 안전한 곳에 보관해 주시기 바랍니다"
          />
        </NoticeArea>
        <LabeledArea
          title="여유 자금"
          contents="QIUEOPVKA@FDJKSAL.NET
          RNVMCZX,NVM,_JDKA@DJAKL.COM"
        />
        <LabeledArea
          title="공개 주소 이름"
          contents="GBMILVZZSNAJ6KS2VXAWHNOYBJE2VUACRCKRHS4KLVQJAAN74MC5GDAUSD5XCNRRI6GJFH72V6HEOKE7EUBSSXOFKOUHCULWUCANUX24IYNX4ENH"
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
    <BottomButton />
  </View>
);

AddressBook.navigationOptions = {
  header: null,
};

export default AddressBook;
