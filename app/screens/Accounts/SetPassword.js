import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  ToastAndroid,
  Alert,
} from 'react-native';

import styles from '../styles';
import strings from '../../resources/strings';

import { Navigation as NavAction, Accounts as AccountsAction } from '../../actions';
import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { NotiPanel } from '../../components/Panel';
import { InputPassword } from '../../components/Input';
import { colors } from '../../resources';

import { createAccountAsync, createRestoreKeyAsync, createRestoreKey, changeRestoreKey } from '../../libs/KeyGenerator';
import AppStorage from '../../libs/AppStorage';

const validate = (text) => {
  // const regex = /^([a-zA-Z0-9~!@#$%^&*()-_]){8,16}$/;
  // const match = text.match(regex);

  // 공백, 사용 불가문자 확인
  if (text.match(/[\n\r\t ]/) || text.match(/[^a-zA-Z0-9~!@#$%^&*()_-]/)) {
    return false;
  }

  // 길이 확인
  if (text.length < 8 || text.length > 16) {
    return false;
  }

  // 문자, 숫자 유무
  if (!text.match(/[a-zA-Z]/)) {
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

const MODE_CREATE = 'create';
const MODE_CHANGE = 'change';

class SetPassword extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const mode = navigation.getParam('mode', MODE_CREATE);

    const { settings } = this.props;
    const Strings = strings[settings.language].Accounts.SetPassword;

    this.state = {
      mode,
      input1: {
        notiText: Strings.HELPER_DEFAULT,
        notiColor: colors.transparent,
        isValid: false,
      },
      input2: {
        notiText: Strings.HELPER_DEFAULT,
        notiColor: colors.transparent,
        isValid: false,
      },
      buttonActive: false,
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onEndEditing = this.onEndEditing.bind(this);
    this.callbackBottomButton = this.callbackBottomButton.bind(this);
    this.validatePasswords = this.validatePasswords.bind(this);
  }

  onChangeText(text) {
    const password1 = this.input1.getWrappedInstance().getText();
    const password2 = this.input2.getWrappedInstance().getText();

    this.setState({
      buttonActive: (password1.length > 0 && password2.length > 0 && text.length > 0),
    });
  }

  onFocus(inputName) {
    const { state } = this;
    const input = { ...state[inputName] };
    const { settings } = this.props;
    const Strings = strings[settings.language].Accounts.SetPassword;

    if (input) {
      return () => {
        const password = this[inputName].getWrappedInstance().getText();

        if (password.length === 0 && input.notiColor === colors.transparent) {
          input.notiColor = colors.textAreaNotiTextGray;
          input.notiText = Strings.HELPER_DEFAULT;
        }

        this.setState({ [inputName]: input });
      };
    }

    return null;
  }

  onEndEditing(inputName) {
    const { state } = this;
    const input = { ...state[inputName] };
    const { settings } = this.props;
    const Strings = strings[settings.language].Accounts.SetPassword;

    if (input) {
      return () => {
        const password = this[inputName].getWrappedInstance().getText();

        this.validatePasswords();

        if (password.trim().length === 0) {
          input.notiText = Strings.HELPER_ERROR_NOTEXT;
          input.notiColor = colors.alertTextRed;

          this.setState({ [inputName]: input });
        }
      };
    }

    return null;
  }

  validatePasswords() {
    const { settings } = this.props;
    const Strings = strings[settings.language].Accounts.SetPassword;

    const { state } = this;
    const { input1, input2 } = state;

    const password1 = this.input1.getWrappedInstance().getText();
    const password2 = this.input2.getWrappedInstance().getText();

    let result = true;

    if (password1.length !== 0) {
      if (validate(password1)) {
        input1.notiText = Strings.HELPER_DEFAULT;
        input1.notiColor = colors.transparent;
      } else {
        input1.notiText = Strings.HELPER_ERROR_NOT_VALID;
        input1.notiColor = colors.alertTextRed;

        result = false;
      }
    } else {
      result = false;
    }

    if (password2.length !== 0) {
      if (validate(password2)) {
        input2.notiText = Strings.HELPER_DEFAULT;
        input2.notiColor = colors.transparent;
      } else {
        input2.notiText = Strings.HELPER_ERROR_NOT_VALID;
        input2.notiColor = colors.alertTextRed;

        result = false;
      }
    } else {
      result = false;
    }

    this.setState({ input1, input2 });

    return result;
  }

  callbackBottomButton() {
    const { onAlertOk, addAccount, changePassword, navigation, accountList } = this.props;
    const { mode, input2 } = this.state;

    const password1 = this.input1.getWrappedInstance().getText();
    const password2 = this.input2.getWrappedInstance().getText();

    const { settings } = this.props;
    const Strings = strings[settings.language].Accounts.SetPassword;

    if (!this.validatePasswords()) {
      Alert.alert(
        '',
        Strings.ALERT_PASSWORD_ERROR,
        [{
          text: Strings.BUTTON_TEXT,
        }],
      );

      return;
    }

    if (password1 !== password2) {
      input2.notiText = Strings.HELPER_ERROR_NOT_MATCH;
      input2.notiColor = colors.alertTextRed;

      this.setState({ input2 });

      return;
    }

    const getSecureKey = navigation.getParam('getSecureKey');
    if (mode === MODE_CREATE) {
      if (!getSecureKey) {
        createAccountAsync(this.input1.getWrappedInstance().getText())
          .then((account) => {
            addAccount({
              name: account.name,
              address: account.address,
              secretSeed: account.secretSeed,
            });

            AppStorage.saveAccountAsync(accountList)
              .then(() => {
                Alert.alert(
                  Strings.ALERT_PASSWORD_SET_TITLE,
                  Strings.ALERT_PASSWORD_SET_MESSAGE,
                  [{
                    text: Strings.BUTTON_TEXT,
                    onPress: () => {
                      onAlertOk(
                        NavAction.pushScreen(
                          NavAction.Screens.ACCOUNT_CREATED,
                          {
                            name: account.name,
                            key: account.secretSeed,
                          },
                        ),
                      );
                    },
                  }],
                  { cancelable: false },
                );
              });
          });
      } else {
        createRestoreKeyAsync(getSecureKey(), this.input1.getWrappedInstance().getText())
          .then((account) => {
            if (accountList.findIndex(element => element.address === account.address) > -1) {
              ToastAndroid.show(Strings.TOAST_DUPLICATED_ADDRESS, ToastAndroid.SHORT);
              return;
            }

            addAccount({
              name: account.name,
              address: account.address,
              secretSeed: account.secretSeed,
            });

            AppStorage.saveAccountAsync(accountList)
              .then(() => {
                Alert.alert(
                  Strings.ALERT_PASSWORD_SET_TITLE,
                  Strings.ALERT_PASSWORD_SET_MESSAGE,
                  [{
                    text: Strings.BUTTON_TEXT,
                    onPress: () => {
                      onAlertOk(
                        NavAction.pushScreen(
                          NavAction.Screens.ACCOUNT_CREATED,
                          {
                            name: account.name,
                            key: account.secretSeed,
                          },
                        ),
                      );
                    },
                  }],
                  { cancelable: false },
                );
              });
          })
          .catch((/* error */) => {
            ToastAndroid.show(Strings.TOAST_ADDRESS_NOT_VALID, ToastAndroid.SHORT);
          });
      }
    }

    if (mode === MODE_CHANGE) {
      const account = navigation.getParam('account', null);

      if (account) {
        if (!getSecureKey) {
          const prevPassword = navigation.getParam('prevPassword', null);
          changeRestoreKey(account, prevPassword, this.input1.getWrappedInstance().getText())
            .then((result) => {
              changePassword(account.index, result.secretSeed);

              AppStorage.saveAccountAsync(accountList)
                .then(() => {
                  Alert.alert(
                    Strings.ALERT_PASSWORD_SET_TITLE,
                    Strings.ALERT_PASSWORD_SET_MESSAGE,
                    [{
                      text: Strings.BUTTON_TEXT,
                      onPress: () => {
                        onAlertOk(
                          NavAction.pushScreen(
                            NavAction.Screens.ACCOUNT_CREATED,
                            {
                              name: result.name,
                              key: result.secretSeed,
                              backFrom: NavAction.Screens.AUTH_PASSWORD,
                            },
                          ),
                        );
                      },
                    }],
                    { cancelable: false },
                  );
                });
            })
            .catch((/* error */) => {
              ToastAndroid.show(Strings.TOAST_SS_NOT_VALID, ToastAndroid.SHORT);
            });
        } else {
          createRestoreKey(getSecureKey(), this.input1.getWrappedInstance().getText())
            .then((secretSeed) => {
              changePassword(account.index, secretSeed);

              AppStorage.saveAccountAsync(accountList)
                .then(() => {
                  Alert.alert(
                    Strings.ALERT_PASSWORD_SET_TITLE,
                    Strings.ALERT_PASSWORD_SET_MESSAGE,
                    [{
                      text: Strings.BUTTON_TEXT,
                      onPress: () => {
                        onAlertOk(
                          NavAction.pushScreen(
                            NavAction.Screens.ACCOUNT_CREATED,
                            {
                              name: account.name,
                              key: secretSeed,
                              backFrom: NavAction.Screens.AUTH_PASSWORD,
                            },
                          ),
                        );
                      },
                    }],
                    { cancelable: false },
                  );
                });
            })
            .catch((/* error */) => {
              ToastAndroid.show(Strings.TOAST_SS_NOT_VALID, ToastAndroid.SHORT);
            });
        }
      }
    }
  }

  render() {
    const { input1, input2, buttonActive, mode } = this.state;
    const { settings } = this.props;
    const Strings = strings[settings.language].Accounts.SetPassword;

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
              actionText: Strings.ACTION_TEXT,
              action: NavAction.popScreen(2),
            },
          }}
        />
        <ScrollView contentContainerStyle={styles.alignCenter}>
          <Text style={[styles.layoutHead, styles.headText]}>
            {Strings.HEAD_TEXT}
          </Text>
          <InputPassword
            ref={(c) => { this.input1 = c; }}
            label={Strings.INPUT1_LABEL}
            placeholder={Strings.PLACEHOLDER}
            onChangeText={this.onChangeText}
            onFocus={this.onFocus('input1')}
            onEndEditing={this.onEndEditing('input1')}
          />
          <NotiPanel
            texts={[
              input1.notiText,
            ]}
            color={input1.notiColor}
            noStar
          />
          <InputPassword
            ref={(c) => { this.input2 = c; }}
            label={Strings.INPUT2_LABEL}
            placeholder={Strings.PLACEHOLDER2}
            onChangeText={this.onChangeText}
            onFocus={this.onFocus('input2')}
            onEndEditing={this.onEndEditing('input2')}
          />
          <NotiPanel
            texts={[
              input2.notiText,
            ]}
            color={input2.notiColor}
            noStar
          />
          <View style={styles.filler} />
          <NotiPanel
            texts={[
              Strings.WARNING1,
              Strings.WARNING2,
            ]}
          />
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
      </View>
    );
  }
}

SetPassword.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  accountList: state.accounts.list,
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  onAlertOk: action => dispatch(action),
  addAccount: account => dispatch(AccountsAction.addAccount(account)),
  changePassword: (index, secretSeed) => dispatch(AccountsAction.changePassword(index, secretSeed)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SetPassword);
