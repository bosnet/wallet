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


import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { InputText, InputTextOptions, InputPassword } from '../../components/Input';
import { NotiPanel } from '../../components/Panel';
import { BottomButton } from '../../components/Button';
import { colors } from '../../resources';
import { Accounts } from '../../resources/strings/ko';
import { Navigation as NavAction, Accounts as AccountsAction } from '../../actions';
import { getPublicFromRestore } from '../../libs/KeyGenerator';

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

class ImportByRestore extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyHelperText: Accounts.ImportAccount.HELPER_DEFAULT_RESTORE,
      keyHelperColor: colors.transparent,

      passHelperText: Accounts.ImportAccount.HELPER_DEFAULT_RES_PASSWORD,
      passHelperColor: colors.transparent,

      buttonActive: false,
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onEndEditing = this.onEndEditing.bind(this);
    this.onNavigateWithResult = this.onNavigateWithResult.bind(this);
    this.validateRestoreKey = this.validateRestoreKey.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.callbackBottomButton = this.callbackBottomButton.bind(this);
  }

  onChangeText() {
    return (text) => {
      if (text.length > 0 && validateKey(text)) {
        this.setState({ buttonActive: true });
      } else {
        this.setState({ buttonActive: false });
      }
    };
  }

  onEndEditing() {
    this.validateRestoreKey();
  }

  onFocus() {
    const { keyHelperColor } = this.state;
    const text = this.input.getWrappedInstance().getText();
    if (text.length === 0 && keyHelperColor === colors.transparent) {
      this.setState({
        keyHelperText: Accounts.ImportAccount.HELPER_DEFAULT_RESTORE,
        keyHelperColor: colors.textAreaNotiTextGray,
      });
    }
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
    } = this.props;

    const key = this.input.getWrappedInstance().getText();
    const password = this.password.getWrappedInstance().getText();

    const isValid = this.validatePassword();
    if (isValid) {
      getPublicFromRestore(key, password)
        .then((account) => {
          if (account) {
            addAccount({
              name: account.name,
              address: account.address,
            });
            goToScreen(NavAction.Screens.HOME);
          } else {
            ToastAndroid.show('올바르지 않은 키입니다.', ToastAndroid.SHORT);
          }
        })
        .catch((/* error */) => {
          ToastAndroid.show('올바르지 않은 키입니다.', ToastAndroid.SHORT);
        });
    }
  }

  validateRestoreKey() {
    const text = this.input.getWrappedInstance().getText();
    let result = false;

    if (text.trim().length === 0) {
      this.setState({
        buttonActive: false,
        keyHelperText: Accounts.ImportAccount.HELPER_ERROR_NO_RESTORE,
        keyHelperColor: colors.alertTextRed,
      });
    } else {
      result = validateKey(text);

      if (result) {
        this.setState({
          buttonActive: true,
          keyHelperColor: colors.transparent,
        });
      } else {
        this.setState({
          buttonActive: false,
          keyHelperText: Accounts.ImportAccount.HELPER_ERROR_NOT_VALID_RESTORE,
          keyHelperColor: colors.alertTextRed,
        });
      }
    }

    return result;
  }

  validatePassword() {
    const password = this.password.getWrappedInstance().getText();
    let result = false;

    if (password.trim().length === 0) {
      this.setState({
        passHelperText: Accounts.ImportAccount.HELPER_ERROR_NO_RES_PASSWORD,
        passHelperColor: colors.alertTextRed,
      });
    } else {
      result = validate(password);

      if (result) {
        this.setState({
          passHelperText: Accounts.ImportAccount.HELPER_DEFAULT_RES_PASSWORD,
          passHelperColor: colors.transparent,
        });
      } else {
        this.setState({
          passHelperText: Accounts.ImportAccount.HELPER_ERROR_NOT_VALID_RES_PASSWORD,
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

    return (
      <View style={styles.container}>
        <AppStatusBar theme={StatusBarTheme.PURPLE} />
        <DefaultToolbar
          theme={DefaultToolbarTheme.PURPLE}
          data={{
            center: {
              title: '계좌 가져오기',
            },
            right: {
              actionText: '취소',
              action: NavAction.backScreen(NavAction.Screens.SELECT_IMPORT_TYPE),
            },
          }}
        />
        <View style={styles.defaultLayout}>

          <ScrollView
            contentContainerStyle={styles.alignCenter}
            showsVerticalScrollIndicator={false}
          >
            <Text style={[styles.layoutHead, styles.headText]}>
              가져올 계좌의 복구키를 입력해 주세요
            </Text>
            <InputText
              ref={(c) => { this.input = c; }}
              label="복구키"
              placeholder={Accounts.ImportAccount.PLACEHOLDER_RESTORE}
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
            />
            <InputPassword
              ref={(c) => { this.password = c; }}
              label="비밀번호"
              placeholder={Accounts.ImportAccount.PLACEHOLDER_RES_PASSWORD}
            />
            <NotiPanel
              texts={[
                passHelperText,
              ]}
              color={passHelperColor}
            />
            <View style={styles.filler} />
            <View style={styles.footer}>
              <NotiPanel
                texts={[
                  '* 비밀번호는 본인 외에 아무도 알 수 없습니다',
                  '* 이 계좌의 비밀번호를 모를 경우 복구키로 계좌를 가져올 수 없\n'
                  + '   으오니, 보안키를 이용하여 계좌 가져오기를 시도해 주시기 바\n'
                  + '   랍니다',
                ]}
              />
            </View>
            <BottomButton
              actions={[
                {
                  text: '다음',
                  callback: this.callbackBottomButton,
                },
              ]}
              inactive={!buttonActive}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

ImportByRestore.navigationOptions = {
  header: null,
};

const mapDispatchToProps = dispatch => ({
  goToScreen: screen => dispatch(NavAction.resetScreen(screen)),
  addAccount: account => dispatch(AccountsAction.addAccount(account)),
});

export default connect(null, mapDispatchToProps)(ImportByRestore);
