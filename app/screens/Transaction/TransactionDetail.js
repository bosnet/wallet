import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Clipboard,
} from 'react-native';

import styles from '../styles';
import { types } from '../../resources';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { TextArea, LabelText } from '../../components/Text';
import { Navigation as NavAction } from '../../actions';

import icCopy from '../../resources/images/ic_list_copy.png';

const renderBalanceArea = (item) => {
  if (item.amount >= 0) {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <LabelText
            text="보낸 계좌"
          >
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(item.address);
              }}
            >
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
        <View style={{ marginLeft: 8 }}>
          <TextArea
            label={item.name}
            text={item.address}
            underline={false}
          />
          <TextArea
            label="받은 금액"
            text={item.amount}
            type={types.TextArea.BALACNE}
            underline={false}
          />
          <TextArea
            label="총액"
            text={item.amount}
            type={types.TextArea.BALACNE}
            underline={false}
          />
        </View>
        
      </View>
    );
  }

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <LabelText
          text="받는 계좌"
        >
          <TouchableOpacity
            onPress={() => {
              Clipboard.setString(item.address);
            }}
          >
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
      <View style={{ marginLeft: 8 }}>
        <TextArea
          label={item.name}
          text={item.address}
          underline={false}
        />
        <TextArea
          label="보낸 금액"
          text={-parseFloat(item.amount)}
          type={types.TextArea.BALACNE}
          underline={false}
        />
        <TextArea
          label="수수료"
          text={item.fee}
          type={types.TextArea.BALACNE}
          underline={false}
        />
        <TextArea
          label="총액"
          text={-parseFloat(item.amount) + parseFloat(item.fee)}
          type={types.TextArea.BALACNE}
          underline={false}
        />
      </View>
    </View>
  );
};

const TransactionDetail = ({ navigation }) => {
  const item = navigation.getParam('item', null);

  return (
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
            text={item.date}
            underline={false}
          />
          <TextArea
            label="거래 구분"
            text={(item.amount < 0) ? '출금' : '입금'}
            underline={false}
          />
          <TextArea
            label="트랜잭션 아이디"
            text={item.txHash}
            underline={false}
          />
          {renderBalanceArea(item)}
          <View style={{ marginBottom: 30 }} />
        </ScrollView>
        <BottomButton
          actions={[
            {
              text: '확인',
              action: NavAction.popScreen(),
            },
            {
              text: '익스플로러',
              callback: () => {
                Linking.openURL(`https://explorer.boscoin.io/tx/${item.txHash}`);
              },
            },
          ]}
        />
      </View>
    </View>
  );
};

TransactionDetail.navigationOptions = {
  header: null,
};

export default TransactionDetail;
