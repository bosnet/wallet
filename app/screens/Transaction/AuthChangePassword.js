import React from 'react';
import { View, Text, ToastAndroid, Alert } from 'react-native';
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
      settings,
      account: navigation.getParam('account', null),
      helperText: Strings[MODE_PASSWORD].HELPER_DEFAULT,
      helperColor: colors.transparent,
      buttonActive: false,
      callback: navigation.getParam('callback', null),
    };

    this.onFocus = this.onFocus.bind(this);
    this.callbackBottomButton = this.callbackBottomButton.bind(this);
    this.onNavigateWithResult = this.onNavigateWithResult.bind(this);
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

  onNavigateWithResult(key) {
    this.input.getWrappedInstance().setText(key.toString());
  }

  callbackBottomButton() {
    const { doAction, accounts } = this.props;
    const { mode, account, next, option, callback } = this.state;
    const text = this.input.getWrappedInstance().getText();
    ToastAndroid.show(JSON.stringify(account), ToastAndroid.SHORT);

    if (mode === MODE_PASSWORD && validatePassword(account, text)) {
      if (option === 'removeAccount') {
        doAction(AccountsAction.removeAccount(account));

        AppStorage.saveAccountAsync(accounts)
          .then(() => {
            Alert.alert(
              '계좌 삭제 완료',
              '계좌 삭제가 완료되었습니다',
              [{
                text: '확인',
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
        doAction(NavAction.popScreen());
        callback(text);

        return;
      }


      ToastAndroid.show('비밀번호 일치', ToastAndroid.SHORT);
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
    }

    if (mode === MODE_SECURE_KEY && validateSecretKey(account, text)) {
      if (option === 'removeAccount') {
        doAction(AccountsAction.removeAccount(account));

        AppStorage.saveAccountAsync(accounts)
          .then(() => {
            Alert.alert(
              '계좌 삭제 완료',
              '계좌 삭제가 완료되었습니다',
              [{
                text: '확인',
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
        doAction(NavAction.popScreen());
        callback(this.input.getWrappedInstance().getText());

        return;
      }

      ToastAndroid.show('보안키 일치', ToastAndroid.SHORT);
      doAction(NavAction.pushScreen(
        NavAction.Screens.SET_PASSWORD,
        {
          mode: 'change',
          account,
          getSecureKey: () => this.input.getWrappedInstance().getText(),
        },
      ));
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
    const { option, mode } = this.state;
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
            });
          }
          if (mode === MODE_SECURE_KEY) {
            this.setState({
              mode: MODE_PASSWORD,
            });
          }
        }}
      />
    );
  }

  render() {
    const { settings } = this.props;
    const { mode, helperColor, helperText, option } = this.state;
    const Strings = strings[settings.language].Accounts.AuthChangePassword;

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
        <View style={styles.defaultLayout}>
          <Text style={[styles.layoutHead, styles.headText]}>
            {Strings[mode].HEAD_TEXT}
          </Text>
          {this.renderInput(mode)}
          <NotiPanel
            texts={[
              helperText,
            ]}
            color={helperColor}
          />
          {this.renderTextButton()}
          <View style={styles.filler} />
          <View style={styles.footer}>
            <NotiPanel
              texts={[
                Strings.NOTICE1,
                Strings.NOTICE2,
              ]}
            />
          </View>
          <BottomButton
            actions={[
              {
                text: Strings.BOTTOM_BUTTON_TEXT,
                callback: this.callbackBottomButton,
              },
            ]}
            // inactive={!buttonActive}
          />
        </View>

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
