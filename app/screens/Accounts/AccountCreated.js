import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Clipboard,
  ToastAndroid,
  Share,
} from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';
import strings from '../../resources/strings';

import { Navigation } from '../../actions';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { TextArea, LabelText } from '../../components/Text';
import { colors } from '../../resources';
import { QRPanel } from '../../components/Panel';
import { getSecureKey } from '../../libs/KeyGenerator';
import AndroidSecureMode from '../../libs/AndroidSecureMode';

import imgQR from '../../resources/images/qr.png';
import AndroidBackHandler from '../../AndroidBackHandler';

class AccountCreated extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const option = navigation.getParam('option', null);

    const { settings } = this.props;
    const Strings = strings[settings.language].Accounts.AccountCreated;

    const keyText = (option === 'showSecureKey') ? Strings.SS_KEY : Strings.RS_KEY;

    this.state = {
      key: navigation.getParam('key', ''),
      keyText,
      name: navigation.getParam('name', ''),
      backFrom: navigation.getParam('backFrom', null),
      option,
    };

    if (option === 'showSecureKey') this.setSecureKey();
  }

  componentDidMount() {
    const { navigation } = this.props;
    const option = navigation.getParam('option', null);

    if (option === 'showSecureKey') AndroidSecureMode.setSecure();
  }

  componentWillUnmount() {
    const { navigation } = this.props;
    const option = navigation.getParam('option', null);

    if (option === 'showSecureKey') AndroidSecureMode.resetSecure();
  }

  setSecureKey() {
    const { navigation } = this.props;
    const account = navigation.getParam('account', null);
    const password = navigation.getParam('prevPassword', null);

    if (account) {
      getSecureKey(account.secretSeed, password).then((key) => {
        this.setState({
          key,
          name: account.name,
        });
      });
    }
  }

  render() {
    const { key, keyText, name, backFrom, option } = this.state;
    const { settings } = this.props;
    const Strings = strings[settings.language].Accounts.AccountCreated;

    return (
      <View style={styles.container}>
        <AppStatusBar theme={StatusBarTheme.PURPLE} />
        <DefaultToolbar
          theme={DefaultToolbarTheme.PURPLE}
          data={{
            center: {
              title: (option === 'showSecureKey') ? Strings.SS_TITLE : Strings.RK_TITLE,
            },
            right: {
              actionText: Strings.BACK_BUTTON,
              action: backFrom ? Navigation.backScreen(backFrom) : Navigation.resetScreen(Navigation.Screens.HOME),
            },
          }}
        />
        <ScrollView
          contentContainerStyle={[styles.alignCenter]}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.layoutHead, styles.headText, { marginBottom: 0 }]}>
            {
              (option === 'showSecureKey')
                ? Strings.SS_HEADTEXT
                : Strings.RK_HEADTEXT
            }
          </Text>
          <View style={styles.section}>
            <TextArea
              label={`${name} ${keyText}`}
              lableColor={colors.labelTextBlack}
              text={key}
              underline={false}
            />
          </View>
          <View style={styles.seperator} />
          <View style={styles.section}>
            <LabelText
              text={`${name} QR CODE`}
              color={colors.headTextBlack}
            />
            <View style={styles.alignCenter}>
              <QRPanel
                value={key}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.filler} />
        <BottomButton
          actions={[
            {
              text: `${Strings.BUTTON_SAVE}`,
              callback: () => {
                Share.share({ message: key });
              },
            },
            {
              text: Strings.BUTTON_COPY,
              callback: () => {
                const text = (option === 'showSecureKey') ? Strings.TOAST_CLIPBOARD_SS : Strings.TOAST_CLIPBOARD_RK;

                ToastAndroid.show(text, ToastAndroid.SHORT);
                Clipboard.setString(key);
              },
            },
          ]}
        />
        <AndroidBackHandler
          action={backFrom ? Navigation.backScreen(backFrom) : Navigation.resetScreen(Navigation.Screens.HOME)}
        />
      </View>
    );
  }
}

AccountCreated.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountCreated);
