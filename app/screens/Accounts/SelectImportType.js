import React from 'react';
import { View } from 'react-native';

import styles from '../styles';


import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { LongButton } from '../../components/Button';
import { colors } from '../../resources';

const SelectImportType = () => (
  <View style={styles.container}>
    <AppStatusBar theme={StatusBarTheme.PURPLE} />
    <DefaultToolbar
      theme={DefaultToolbarTheme.PURPLE}
      data={{
        center: {
          title: '가져오기 방법 선택',
        },
        right: {
          actionText: '닫기',
        },
      }}
    />
    <View style={styles.centerLayout}>
      <LongButton
        text="보안키로 계좌 가져오기"
      />
      <LongButton
        text="복구키로 계좌 가져오기"
        backgroundColor={colors.buttonWhite}
        textColor={colors.buttonTextPurple}
      />
    </View>

  </View>
);

SelectImportType.navigationOptions = {
  header: null,
};

export default SelectImportType;
