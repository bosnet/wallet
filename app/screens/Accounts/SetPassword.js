import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ToastAndroid,
} from 'react-native';

import styles from '../styles';

import { Navigation as NavAction, Modal as ModalAction } from '../../actions';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { NotiPanel } from '../../components/Panel';
import { InputPassword } from '../../components/Input';
import { colors } from '../../resources';
import { Accounts } from '../../resources/strings';

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
        text: '',
        iconVisible: false,
        notiVisible: false,
        notiText: Strings.HELPER_DEFAULT,
        notiColor: colors.transparent,
        isValid: false,
      },
      input2: {
        text: '',
        iconVisible: false,
        notiVisible: false,
        notiText: Strings.HELPER_DEFAULT,
        notiColor: colors.transparent,
        isValid: false,
      },
      buttonActive: false,
      buttonAction: this.failAlert,
    };

    this.failAlert = ModalAction.showAlert({
      content: '비밀번호는 영문(대/소문자), 숫자, 특수 문자 포함 8자이상 입니다',
    });

    this.successAlert = ModalAction.showAlert({
      title: '비밀번호 설정 완료',
      content: '다음 화면에 보이는 복구키는\n월렛에서 계좌를 가져올 때 필요합니다\n복구키를 반드시 저장해 두세요',
      confirmText: '확인',
      cancelable: false,
    });

    this.onChangeText = this.onChangeText.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onEndEditing = this.onEndEditing.bind(this);
  }

  onChangeText(inputName) {
    const { state } = this;
    const input = state[inputName];
    const { input1, input2 } = state;

    if (input) {
      return (text) => {
        if (text.length > 0) input.iconVisible = true;
        else input.iconVisible = false;

        input.text = text;

        this.setState({
          [inputName]: input,
          buttonActive: (input1.text.length > 0 && input2.text.length > 0),
        });
      };
    }

    return null;
  }

  onFocus(inputName) {
    const { state } = this;
    const input = { ...state[inputName] };

    if (input) {
      return () => {
        if (input.text.length === 0 && input.notiColor === colors.transparent) {
          input.notiColor = colors.textAreaNotiTextGray;
          input.notiText = Strings.HELPER_DEFAULT;
        }

        this.setState({
          [inputName]: input,
        });
      };
    }

    return null;
  }

  onEndEditing(inputName) {
    const { state } = this;
    const input = { ...state[inputName] };
    const { input1, input2 } = state;

    if (input) {
      return () => {
        if (input.text.trim().length === 0) {
          input.notiText = Strings.HELPER_ERROR_NOTEXT;
          input.notiColor = colors.alertTextRed;
        } else {
          const result = validate(input.text);
          input.isValid = result;

          this.setState({
            buttonAction: this.failAlert,
          });

          if (!result) {
            input.notiText = Strings.HELPER_ERROR_RANGE;
            input.notiColor = colors.alertTextRed;
          } else if (inputName === 'input2' && input1.text !== input2.text) {
            input.notiText = Strings.HELPER_ERROR_NOT_MATCH;
            input.notiColor = colors.alertTextRed;
          } else {
            input.notiText = Strings.HELPER_DEFAULT;
            input.notiColor = colors.textAreaNotiTextGray;
            
            this.setState({
              buttonAction: this.successAlert,
            });
          }
        }

        this.setState({
          [inputName]: input,
        });
      };
    }

    return null;
  }

  render() {
    const { input1, input2, buttonActive, buttonAction } = this.state;

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
            label={Strings.INPUT1_LABEL}
            placeholder={Strings.PLACEHOLDER}
            isIconVisible={input1.iconVisible}
            onChangeText={this.onChangeText('input1')}
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
            label={Strings.INPUT2_LABEL}
            placeholder={Strings.PLACEHOLDER}
            isIconVisible={input2.iconVisible}
            onChangeText={this.onChangeText('input2')}
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
                action: buttonAction,
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

export default SetPassword;
