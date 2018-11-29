import React from 'react';
import {
  View, Text, ToastAndroid,
  Alert, ScrollView,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';

import { Navigation as NavAction, Accounts as AccountsAction } from '../../actions';
import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton, TextButton } from '../../components/Button';
import { NotiPanel } from '../../components/Panel';
import { InputPassword, InputText, InputTextOptions } from '../../components/Input';
import { validatePassword, validateSecretKey } from '../../libs/KeyGenerator';
import AppStorage from '../../libs/AppStorage';

import { colors } from '../../resources';
import strings from '../../resources/strings';
import AndroidBackHandler from '../../AndroidBackHandler';

const MODE_PASSWORD = 'modePassword';
const MODE_SECURE_KEY = 'modeSecure';
const NEXT_CHANGE_PASSWORD = 'changePassword';
const NEXT_SHOW_SECURE_KEY = 'showSecureKey';

class AuthChangePassword extends React.Component {
  constructor(props) {
    super(props);

    const { settings } = this.props;
    const { navigation } = this.props;
    const Strings = strings[settings.language].Accounts.AuthChangePassword;

    this.state = {
      mode: MODE_PASSWORD,
      next: navigation.getParam('next', NavAction.Screens.SET_PASSWORD),
      option: navigation.getParam('option', null),
      account: navigation.getParam('account', null),
      helperText: Strings[MODE_PASSWORD].HELPER_DEFAULT,
      helperColor: colors.transparent,
      callback: navigation.getParam('callback', null),

      buttonActive: false,
    };

    this.onFocus = this.onFocus.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.callbackBottomButton = this.callbackBottomButton.bind(this);
    this.onNavigateWithResult = this.onNavigateWithResult.bind(this);
    this._keyboardDidHide = this._keyboardDidHide.bind(this);
  }

  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  onFocus() {
    const { mode, helperColor } = this.state;
    const { settings } = this.props;
    const Strings = strings[settings.language].Accounts.AuthChangePassword;

    const text = this.input.getWrappedInstance().getText();
    if (helperColor === colors.transparent) {
      this.setState({
        helperText: Strings[mode].HELPER_DEFAULT,
        helperColor: colors.textAreaNotiTextGray,
      });
    }
  }

  onChangeText(text) {
    const input = this.input.getWrappedInstance().getText();

    this.setState({
      buttonActive: (text.length > 0),
    });
  }

  onNavigateWithResult(key) {
    this.input.getWrappedInstance().setText(key.toString())
      .then(() => {
        this.setState({
          buttonActive: (key.toString().length > 0),
        });
      });
  }

  _keyboardDidHide() {
    const { settings } = this.props;
    const { mode } = this.state;
    const Strings = strings[settings.language].Accounts.AuthChangePassword;


    const text = this.input.getWrappedInstance().getText();

    if (text.length === 0) {
      this.setState({
        helperText: Strings[mode].HELPER_NO_INPUT,
        helperColor: colors.alertTextRed,
      });
    }
  }

  callbackBottomButton() {
    const { doAction, accounts } = this.props;
    const { mode, account, next, option, callback } = this.state;
    const text = this.input.getWrappedInstance().getText();

    const { settings } = this.props;
    const Strings = strings[settings.language].Accounts.AuthChangePassword;

    if (text.length === 0) {
      this.setState({
        helperText: Strings[mode].HELPER_NO_INPUT,
        helperColor: colors.alertTextRed,
      });

      return;
    }
    if (mode === MODE_PASSWORD) {
      if (validatePassword(account, text)) {
        this.setState({
          helperText: Strings[mode].HELPER_DEFAULT,
          helperColor: colors.transparent,
        });

        if (option === 'removeAccount') {
          doAction(AccountsAction.removeAccount(account));

          AppStorage.saveAccountAsync(accounts)
            .then(() => {
              Alert.alert(
                Strings.ALERT_REMOVE_OK_TITLE,
                Strings.ALERT_REMOVE_OK_CONTEXT,
                [{
                  text: Strings.ALERT_BUTTON_OK,
                  onPress: () => {
                    doAction(NavAction.resetScreen(NavAction.Screens.HOME));
                  },
                }],
                { cancelable: false },
              );
            });

          return;
        }

        if (option === 'callback') {
          // doAction(NavAction.popScreen());
          callback(text);

          return;
        }

        doAction(NavAction.pushScreen(
          next,
          {
            mode: 'change',
            account,
            prevPassword: text,
            option,
            backFrom: (option === 'showSecureKey') ? NavAction.Screens.WARNING_KEY_LEAKAGE : null,
          },
        ));
      } else {
        this.setState({
          helperText: Strings[mode].HELPER_INVALID,
          helperColor: colors.alertTextRed,
        });
      }
    }

    if (mode === MODE_SECURE_KEY) {
      if (validateSecretKey(account, text)) {
        if (option === 'removeAccount') {
          doAction(AccountsAction.removeAccount(account));

          AppStorage.saveAccountAsync(accounts)
            .then(() => {
              Alert.alert(
                Strings.ALERT_REMOVE_OK_TITLE,
                Strings.ALERT_REMOVE_OK_CONTEXT,
                [{
                  text: Strings.ALERT_BUTTON_OK,
                  onPress: () => {
                    doAction(NavAction.resetScreen(NavAction.Screens.HOME));
                  },
                }],
                { cancelable: false },
              );
            });

          return;
        }

        if (option === 'callback') {
          // doAction(NavAction.popScreen());
          callback(this.input.getWrappedInstance().getText());

          return;
        }

        doAction(NavAction.pushScreen(
          NavAction.Screens.SET_PASSWORD,
          {
            mode: 'change',
            account,
            getSecureKey: () => this.input.getWrappedInstance().getText(),
          },
        ));
      } else {
        this.setState({
          helperText: Strings[mode].HELPER_INVALID,
          helperColor: colors.alertTextRed,
        });
      }
    }
  }

  renderInput(mode) {
    const { settings } = this.props;
    const Strings = strings[settings.language].Accounts.AuthChangePassword;

    if (mode === MODE_PASSWORD) {
      return (
        <InputPassword
          ref={(c) => { this.input = c; }}
          label={Strings[mode].INPUT_LABEL}
          placeholder={Strings[mode].INPUT_PLACEHOLDER}
          onFocus={this.onFocus}
          onChangeText={this.onChangeText}
        />
      );
    }
    if (mode === MODE_SECURE_KEY) {
      return (
        <InputText
          ref={(c) => { this.input = c; }}
          label={Strings[mode].INPUT_LABEL}
          placeholder={Strings[mode].INPUT_PLACEHOLDER}
          onFocus={this.onFocus}
          onChangeText={this.onChangeText}
          option={{
            type: InputTextOptions.QR_CODE,
            action: NavAction.pushScreen(
              NavAction.Screens.QR_SCAN,
              {
                callback: this.onNavigateWithResult,
              },
            ),
          }}
          multiline
        />
      );
    }

    return null;
  }

  renderTextButton() {
    const { option, mode, next } = this.state;
    const { settings } = this.props;
    const Strings = strings[settings.language].Accounts.AuthChangePassword;

    if (option === 'showSecureKey' || option === 'callback') {
      return null;
    }

    return (
      <TextButton
        text={Strings[mode].TEXT_BUTTON_LABEL}
        callback={() => {
          if (mode === MODE_PASSWORD) {
            this.setState({
              mode: MODE_SECURE_KEY,
              helperText: Strings[MODE_SECURE_KEY].HELPER_DEFAULT,
              helperColor: colors.textAreaNotiTextGray,
            });
          }
          if (mode === MODE_SECURE_KEY) {
            this.setState({
              mode: MODE_PASSWORD,
              helperText: Strings[MODE_PASSWORD].HELPER_DEFAULT,
              helperColor: colors.textAreaNotiTextGray,
            });
          }

          this.onChangeText('');
        }}
      />
    );
  }

  render() {
    const { mode, helperColor, helperText, next, buttonActive } = this.state;
    const { settings } = this.props;
    const Strings = strings[settings.language].Accounts.AuthChangePassword;

    let noti = Strings.NOTICE1;
    if ( mode === MODE_SECURE_KEY ) noti = Strings.NOTICE1_SS;

    return (
      <View style={styles.container}>
        <AppStatusBar theme={StatusBarTheme.PURPLE} />
        <DefaultToolbar
          theme={DefaultToolbarTheme.PURPLE}
          data={{
            center: {
              title: Strings[mode].TITLE,
            },
            right: {
              actionText: Strings.BACK_KEY_TEXT,
              action: NavAction.popScreen(),
            },
          }}
        />
        <ScrollView
          contentContainerStyle={[styles.alignCenter, { alignContent: 'stretch' }]}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.layoutHead, styles.headText]}>
            {Strings[mode].HEAD_TEXT}
          </Text>
          {this.renderInput(mode)}
          <NotiPanel
            texts={[
              helperText,
            ]}
            color={helperColor}
            noStar
          />
          {this.renderTextButton()}
        </ScrollView>
        <View style={styles.filler} />
        <View style={styles.footer}>
          <NotiPanel
            texts={[
              next === NavAction.Screens.SET_PASSWORD ? Strings.NOTICE_CHANGE1 : noti,
              next === NavAction.Screens.SET_PASSWORD ? Strings.NOTICE_CHANGE2 : null,
            ]}
          />
        </View>
        <BottomButton
          actions={[
            {
              text: Strings.BUTTON_TEXT_OK,
              callback: this.callbackBottomButton,
            },
          ]}
          inactive={!buttonActive}
        />
        <AndroidBackHandler />
      </View>
    );
  }
}

AuthChangePassword.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  accounts: state.accounts.list,
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthChangePassword);
