import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ScrollView,
  ToastAndroid,
  Alert,
} from 'react-native';
import firebase from 'react-native-firebase';

import styles from '../styles';

import { Navigation as NavAction, Accounts as AccountsAction } from '../../actions';
import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { NotiPanel } from '../../components/Panel';
import { InputPassword } from '../../components/Input';
import { colors } from '../../resources';
import { Accounts } from '../../resources/strings';

import { createAccountAsync, createRestoreKeyAsync } from '../../libs/KeyGenerator';
import AppStorage from '../../libs/AppStorage';

const Strings = Accounts.SetPassword;

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


class SetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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

  onChangeText() {
    const password1 = this.input1.getWrappedInstance().getText();
    const password2 = this.input2.getWrappedInstance().getText();

    this.setState({
      buttonActive: (password1.length > 0 && password2.length > 0),
    });
  }

  onFocus(inputName) {
    const { state } = this;
    const input = { ...state[inputName] };

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

    if (password1 !== password2 && result === true) {
      input2.notiText = Strings.HELPER_ERROR_NOT_MATCH;
      input2.notiColor = colors.alertTextRed;

      result = false;
    }

    this.setState({ input1, input2 });

    return result;
  }

  callbackBottomButton() {
    const { onAlertOk, addAccount, navigation, accountList } = this.props;

    if (!this.validatePasswords()) {
      Alert.alert(
        '',
        '비밀번호는 영문(대/소문자), 숫자, 특수 문자 포함 8자이상 입니다',
        [{
          text: '확인',
        }],
      );

      return;
    }

    const getSecureKey = navigation.getParam('getSecureKey');
    if (!getSecureKey) {
      createAccountAsync(this.input1.getWrappedInstance().getText()).then((account) => {
        addAccount({
          name: account.name,
          address: account.address,
        });

        AppStorage.saveAccountAsync(accountList)
          .then(() => {
            Alert.alert(
              '비밀번호 설정 완료',
              '다음 화면에 보이는 복구키는\n월렛에서 계좌를 가져올 때 필요합니다\n복구키를 반드시 저장해 두세요',
              [{
                text: '확인',
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
          })
          .catch(() => {
            ToastAndroid.show('저장에 실패하였습니다. 다시 시도해 주세요.', ToastAndroid.SHORT);
          });
      });
    } else {
      createRestoreKeyAsync(getSecureKey(), this.input1.getWrappedInstance().getText())
        .then((account) => {
          addAccount({
            name: account.name,
            address: account.address,
          });

          AppStorage.saveAccountAsync(accountList)
            .then(() => {
              Alert.alert(
                '비밀번호 설정 완료',
                '다음 화면에 보이는 복구키는\n월렛에서 계좌를 가져올 때 필요합니다\n복구키를 반드시 저장해 두세요',
                [{
                  text: '확인',
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
            })
            .catch(() => {
              ToastAndroid.show('저장에 실패하였습니다. 다시 시도해 주세요.', ToastAndroid.SHORT);
            });
        })
        .catch((/* error */) => {
          ToastAndroid.show('올바르지 않은 키입니다.', ToastAndroid.SHORT);
        });
    }
  }

  render() {
    const { input1, input2, buttonActive } = this.state;

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
          />
          <InputPassword
            ref={(c) => { this.input2 = c; }}
            label={Strings.INPUT2_LABEL}
            placeholder={Strings.PLACEHOLDER}
            onChangeText={this.onChangeText}
            onFocus={this.onFocus('input2')}
            onEndEditing={this.onEndEditing('input2')}
          />
          <NotiPanel
            texts={[
              input2.notiText,
            ]}
            color={input2.notiColor}
          />
          <View style={styles.filler} />
          <NotiPanel
            texts={[
              Strings.WARNING1,
              Strings.WARNING2,
            ]}
          />
          <BottomButton
            actions={[
              {
                text: Strings.BOTTOM_BUTTON,
                callback: this.callbackBottomButton,
              },
            ]}
            inactive={!buttonActive}
          />
        </ScrollView>
      </View>
    );
  }
}

SetPassword.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  accountList: state.accounts.list,
});

const mapDispatchToProps = dispatch => ({
  onAlertOk: action => dispatch(action),
  addAccount: account => dispatch(AccountsAction.addAccount(account)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SetPassword);
