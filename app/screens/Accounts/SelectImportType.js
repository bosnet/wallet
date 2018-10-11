import React from 'react';
import { View } from 'react-native';

import styles from '../styles';


import { Navigation as NavAction } from '../../actions';
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
          action: NavAction.popScreen(),
        },
      }}
    />
    <View style={styles.centerLayout}>
      <LongButton
        text="보안키로 계좌 가져오기"
        action={NavAction.pushScreen(NavAction.Screens.IMPORT_BY_SECURE)}
      />
      <LongButton
        text="복구키로 계좌 가져오기"
        backgroundColor={colors.buttonWhite}
        textColor={colors.buttonTextPurple}
        action={NavAction.pushScreen(NavAction.Screens.IMPORT_BY_RESTORE)}
      />
    </View>

  </View>
);

SelectImportType.navigationOptions = {
  header: null,
};

export default SelectImportType;
