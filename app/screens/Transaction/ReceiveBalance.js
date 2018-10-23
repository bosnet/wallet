import React from 'react';
import {
  View,
  Text,
  Clipboard,
  ToastAndroid,
  Share,
} from 'react-native';

import styles from '../styles';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { TextArea, LabelText } from '../../components/Text';
import { colors } from '../../resources';
import { QRPanel } from '../../components/Panel';
import { Navigation as NavAction } from '../../actions';

class ReceiveBalance extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;

    this.state = {
      account: navigation.getParam('account', null),
    };
  }

  render() {
    const { account } = this.state;

    return (
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
              action: NavAction.popScreen(),
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
              text={(account && account.address) ? account.address : ''}
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
              value={(account && account.address) ? account.address : ''}
            />
          </View>
        </View>
        <BottomButton
          actions={[
            {
              text: '공유',
              callback: () => {
                if (account && account.address) Share.share({ message: account.address });
              },
            },
            {
              text: '복사',
              callback: () => {
                if (account && account.address) {
                  ToastAndroid.show('클립보드에 복사되었습니다', ToastAndroid.SHORT);
                  Clipboard.setString(account.address);
                }
              },
            },
          ]}
        />
      </View>
    );
  }
}


ReceiveBalance.navigationOptions = {
  header: null,
};

export default ReceiveBalance;
