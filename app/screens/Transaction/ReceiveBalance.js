import React from 'react';
import {
  View,
  Text,
  Clipboard,
  ToastAndroid,
  Share,
} from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';
import strings from '../../resources/strings';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { TextArea, LabelText } from '../../components/Text';
import { colors } from '../../resources';
import { QRPanel } from '../../components/Panel';
import { Navigation as NavAction } from '../../actions';
import AndroidBackHandler from '../../AndroidBackHandler';

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
    const { settings } = this.props;
    const Strings = strings[settings.language].Transactions.ReceiveBalance;
    
    return (
      <View style={styles.container}>
        <AppStatusBar theme={StatusBarTheme.PURPLE} />
        <DefaultToolbar
          theme={DefaultToolbarTheme.PURPLE}
          data={{
            center: {
              title: Strings.TITLE,
            },
            right: {
              actionText: Strings.BACK_BUTTON,
              action: NavAction.popScreen(),
            },
          }}
        />
        <View style={styles.defaultLayout}>
          <View style={styles.section}>
            <TextArea
              label={(
                `${account.name} ${Strings.PUBLIC_ADDRESS}`
              )}
              lableColor={colors.labelTextBlack}
              text={(account && account.address) ? account.address : ''}
              underline={false}
            />
          </View>
          <View style={[styles.seperator]} />
          <View style={[styles.section]}>
            <LabelText
              text={(
                <Text>
                  {`${account.name} QR CODE`}
                </Text>
              )}
              color={colors.labelTextBlack}
            />
            <View style={{ marginBottom: 20 }} />
            <QRPanel
              value={(account && account.address) ? account.address : ''}
            />
          </View>
        </View>
        <BottomButton
          actions={[
            {
              text: Strings.BUTTON_TEXT_SHARE,
              callback: () => {
                if (account && account.address) Share.share({ message: account.address });
              },
            },
            {
              text: Strings.BUTTON_TEXT_COPY,
              callback: () => {
                if (account && account.address) {
                  ToastAndroid.show(Strings.TOAST_CLIPBOARD, ToastAndroid.SHORT);
                  Clipboard.setString(account.address);
                }
              },
            },
          ]}
        />
        <AndroidBackHandler />
      </View>
    );
  }
}


ReceiveBalance.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  settings: state.settings,
});


export default connect(mapStateToProps)(ReceiveBalance);
