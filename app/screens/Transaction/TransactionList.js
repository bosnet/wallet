import React from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';

import styles from '../styles';
import { colors, types } from '../../resources';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BalancePanel } from '../../components/Panel';
import { PanelButton, LongButton } from '../../components/Button';
import { ItemList } from '../../components/List';

const TransactionList = ({ navigation }) => {
  const account = navigation.getParam('account', null);

  return (
    <View style={styles.container}>
      <AppStatusBar theme={StatusBarTheme.WHITE} />
      <DefaultToolbar
        theme={DefaultToolbarTheme.WHITE}
        data={{
          left: {
            hasArrow: true,
            title: account ? account.name : '',
          },
          right: {
            actionText: '관리',
          },
        }}
      />
      <ScrollView
        contentContainerStyle={styles.alignCenter}
        showsVerticalScrollIndicator={false}
      >
        <BalancePanel
          text={account.amount ? account.amount : 0}
        />
        <PanelButton
          buttons={[
            {
              text: '보내기',
            },
            {
              text: '받기',
            },
          ]}
        />
        <Text
          style={[
            styles.layoutHead,
            {
              fontSize: 20,
              fontFamily: 'SpoqaHanSans-Regular',
              color: colors.layoutHeadText,
              textAlign: 'center',
            }]}
        >
          {'이 계좌를 유효한 계좌로 만들기 위해\n최소 잔액(0.1BOS)이 있어야 합니다\n공개 주소로 최소 잔액 0.1 BOS를\n받으세요'}
        </Text>
        <LongButton
          text="0.1 BOS 받기"
          backgroundColor={colors.buttonWhite}
          textColor={colors.buttonTextPurple}
        />
      </ScrollView>
    </View>
  );
};

TransactionList.navigationOptions = {
  header: null,
};

export default TransactionList;
