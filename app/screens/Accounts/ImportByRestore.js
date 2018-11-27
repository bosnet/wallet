import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  ToastAndroid,
  KeyboardAvoidingView,
} from 'react-native';

import styles from '../styles';
import strings from '../../resources/strings';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { InputText, InputTextOptions, InputPassword } from '../../components/Input';
import { NotiPanel } from '../../components/Panel';
import { BottomButton } from '../../components/Button';
import { colors } from '../../resources';
import { Navigation as NavAction, Accounts as AccountsAction } from '../../actions';
import { getPublicFromRestore } from '../../libs/KeyGenerator';
import AndroidBackHandler from '../../AndroidBackHandler';
import AppStorage from '../../libs/AppStorage';

const validateKey = (text) => {
  if (text.match(/^BOS.+/)) {
    return true;
  }

  return false;
};

const validate = (text) => {
  // const regex = /^([a-zA-Z0-9~!@#$%^&*()-_]){8,16}$/;
  // const match = text.match(regex);

  // 공백, 사용 불가문자 확인
  if (text.match(/[\n\r\t ]/) || text.match(/[^a-zA-Z0-9~!@#$%^&*()_-]/)) {
    return false;
  }

  // 길이 확인
  if (text.length < 8) {
    return false;
  }

  // 소문자 유무
  if (!text.match(/[a-z]/)) {
    return false;
  }

  // 대문자 유무
  if (!text.match(/[A-Z]/)) {
    return false;
  }

  // 숫자 유무
  if (!text.match(/[0-9]/)) {
    return false;
  }

  // 특수문자 유무
  if (!text.match(/[!@#$%^&*()_-]/)) {
    return false;
  }

  return true;
};

class ImportByRestore extends React.Component {
  constructor(props) {
    super(props);

    const { settings } = this.props;
    const Strings = strings[settings.language].Accounts.ImportAccount;

    this.state = {
      keyHelperText: Strings.HELPER_DEFAULT_RESTORE,
      keyHelperColor: colors.textAreaNotiTextGray,

      passHelperText: Strings.HELPER_DEFAULT_RES_PASSWORD,
      passHelperColor: colors.textAreaNotiTextGray,

      buttonActive: false,
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onEndEditing = this.onEndEditing.bind(this);
    this.onNavigateWithResult = this.onNavigateWithResult.bind(this);
    this.validateRestoreKey = this.validateRestoreKey.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.callbackBottomButton = this.callbackBottomButton.bind(this);
  }

  onChangeText() {
    return (text) => {
      const password = this.password.getWrappedInstance().getText();
      if (text.length > 0 && password.length > 0) {
        this.setState({ buttonActive: true });
      } else {
        this.setState({ buttonActive: false });
      }
    };
  }

  onChangePassword() {
    return (password) => {
      const text = this.input.getWrappedInstance().getText();
      if (text.length > 0 && password.length > 0) {
        this.setState({ buttonActive: true });
      } else {
        this.setState({ buttonActive: false });
      }
    };
  }

  onEndEditing() {
    this.validateRestoreKey();
  }

  onNavigateWithResult(key) {
    this.input.getWrappedInstance().setText(key.toString()).then(() => {
      this.validateRestoreKey();
    });
  }

  callbackBottomButton() {
    const {
      addAccount,
      goToScreen,
      accounts,
    } = this.props;

    const { settings } = this.props;
    const Strings = strings[settings.language].Accounts.ImportAccount;

    const key = this.input.getWrappedInstance().getText();
    const password = this.password.getWrappedInstance().getText();

    const isValid = this.validatePassword();
    if (isValid) {
      getPublicFromRestore(key, password)
        .then((account) => {
          // console.log(JSON.stringify(account));

          if (accounts.map(e => e.address).indexOf(account.address) >= 0) {
            ToastAndroid.show(Strings.TOAST_DUPLICATED_ADDRESS, ToastAndroid.SHORT);
            return;
          }

          if (account) {
            addAccount({
              name: account.name,
              address: account.address,
              secretSeed: account.secretSeed,
            });

            AppStorage.saveAccountAsync(accounts)
              .then(() => {
                goToScreen(NavAction.Screens.HOME);
              });
          } else {
            ToastAndroid.show(Strings.TOAST_RK_NOT_VALID, ToastAndroid.SHORT);
          }
        })
        .catch((/* error */) => {
          ToastAndroid.show(Strings.TOAST_RK_NOT_VALID, ToastAndroid.SHORT);
        });
    }
  }

  validateRestoreKey() {
    const { settings } = this.props;
    const Strings = strings[settings.language].Accounts.ImportAccount;

    const text = this.input.getWrappedInstance().getText();
    let result = false;

    if (text.trim().length === 0) {
      this.setState({
        keyHelperText: Strings.HELPER_ERROR_NO_RESTORE,
        keyHelperColor: colors.alertTextRed,
      });
    } else {
      result = validateKey(text);

      if (result) {
        this.setState({
          keyHelperColor: colors.transparent,
        });
      } else {
        this.setState({
          keyHelperText: Strings.HELPER_ERROR_NOT_VALID_RESTORE,
          keyHelperColor: colors.alertTextRed,
        });
      }
    }

    return result;
  }

  validatePassword() {
    const { settings } = this.props;
    const Strings = strings[settings.language].Accounts.ImportAccount;

    const password = this.password.getWrappedInstance().getText();
    let result = false;

    if (password.trim().length === 0) {
      this.setState({
        passHelperText: Strings.HELPER_ERROR_NO_RES_PASSWORD,
        passHelperColor: colors.alertTextRed,
      });
    } else {
      result = validate(password);

      if (result) {
        this.setState({
          passHelperText: Strings.HELPER_DEFAULT_RES_PASSWORD,
          passHelperColor: colors.transparent,
        });
      } else {
        this.setState({
          passHelperText: Strings.HELPER_ERROR_NOT_VALID_RES_PASSWORD,
          passHelperColor: colors.alertTextRed,
        });
      }
    }

    return result;
  }

  render() {
    const {
      keyHelperText,
      keyHelperColor,
      passHelperText,
      passHelperColor,
      buttonActive,
    } = this.state;

    const { settings } = this.props;
    const Strings = strings[settings.language].Accounts.ImportAccount;

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
              action: NavAction.resetScreen(NavAction.Screens.HOME),
            },
          }}
        />
        <ScrollView
          contentContainerStyle={[styles.alignCenter]}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.layoutHead, styles.headText]}>
            {Strings.IMPORT_RK_MESSAGE}
          </Text>
          <InputText
            ref={(c) => { this.input = c; }}
            label={Strings.IMPORT_RK_LABEL}
            placeholder={Strings.PLACEHOLDER_RESTORE}
            option={{
              type: InputTextOptions.QR_CODE,
              action: NavAction.pushScreen(
                NavAction.Screens.QR_SCAN,
                {
                  callback: this.onNavigateWithResult,
                },
              ),
            }}
            onFocus={this.onFocus}
            onEndEditing={this.onEndEditing}
            onChangeText={this.onChangeText()}
            multiline
          />
          <NotiPanel
            texts={[
              keyHelperText,
            ]}
            color={keyHelperColor}
            noStar
          />
          <InputPassword
            ref={(c) => { this.password = c; }}
            label={Strings.PASSWORD_LABEL}
            placeholder={Strings.PLACEHOLDER_RES_PASSWORD}
            onChangeText={this.onChangePassword()}
          />
          <NotiPanel
            texts={[
              passHelperText,
            ]}
            color={passHelperColor}
            noStar
          />
          <View style={styles.filler} />
          <View style={styles.footer}>
            <NotiPanel
              texts={[
                Strings.NOTICE1_RK,
                Strings.NOTICE2_RK,
              ]}
            />
          </View>
        </ScrollView>
        <View style={styles.filler} />
        <BottomButton
          actions={[
            {
              text: Strings.BUTTON_TEXT,
              callback: this.callbackBottomButton,
            },
          ]}
          inactive={!buttonActive}
        />
        <AndroidBackHandler
          action={NavAction.resetScreen(NavAction.Screens.HOME)}
        />
      </View>
    );
  }
}

ImportByRestore.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  accounts: state.accounts.list,
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  goToScreen: screen => dispatch(NavAction.resetScreen(screen)),
  addAccount: account => dispatch(AccountsAction.addAccount(account)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImportByRestore);
