import React from 'react';
import { View } from 'react-native';

import styles from '../styles';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { AlertPanel } from '../../components/Panel';

import icTrash from '../../resources/images/ic_trash.png';

const ConfirmRemove = () => (
  <View style={styles.container}>
    <AppStatusBar theme={StatusBarTheme.PURPLE} />
    <DefaultToolbar
      theme={DefaultToolbarTheme.PURPLE}
      data={{
        center: {
          title: '계좌 삭제 최종 확인',
        },
        right: {
          actionText: '취소',
        },
      }}
    />
    <View style={styles.centerLayout}>
      <AlertPanel
        icon={icTrash}
        text="정말 계좌를 삭제하시겠습니까?"
      />
    </View>
    <BottomButton
      actions={[
        { text: '확인' },
      ]}
    />
  </View>
);

ConfirmRemove.navigationOptions = {
  header: null,
};

export default ConfirmRemove;
