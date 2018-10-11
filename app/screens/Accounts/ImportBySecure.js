import React from 'react';
import { View, Text, ScrollView, ToastAndroid } from 'react-native';

import styles from '../styles';


import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { InputText, InputTextOptions } from '../../components/Input';
import { NotiPanel } from '../../components/Panel';
import { BottomButton } from '../../components/Button';
import { colors } from '../../resources';
import { Accounts } from '../../resources/strings';
import { Navigation as NavAction } from '../../actions';

const validate = (text) => {
  if (text.match(/^S.+/)) {
    return true;
  }

  return false;
};

class ImportBySecure extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      helperText: Accounts.ImportAccount.HELPER_DEFAULT_SECURE,
      helperColor: colors.transparent,
      buttonActive: false,
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onEndEditing = this.onEndEditing.bind(this);
    this.onNavigateWithResult = this.onNavigateWithResult.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  onChangeText() {
    return (text) => {
      if (text.length > 0 && validate(text)) {
        this.setState({ buttonActive: true });
      } else {
        this.setState({ buttonActive: false });
      }
    };
  }


  onFocus() {
    const { helperColor } = this.state;
    const text = this.input.getWrappedInstance().getText();
    if (text.length === 0 && helperColor === colors.transparent) {
      this.setState({
        helperText: Accounts.ImportAccount.HELPER_DEFAULT_SECURE,
        helperColor: colors.textAreaNotiTextGray,
      });
    }
  }

  onEndEditing() {
    this.validateInput();
  }

  onNavigateWithResult(key) {
    this.input.getWrappedInstance().setText(key.toString()).then(() => {
      this.validateInput();
    });
  }

  validateInput() {
    const text = this.input.getWrappedInstance().getText();

    if (text.trim().length === 0) {
      this.setState({
        buttonActive: true,
        helperText: Accounts.ImportAccount.HELPER_ERROR_NO_SECURE,
        helperColor: colors.alertTextRed,
      });
    } else {
      const result = validate(text);

      if (result) {
        this.setState({
          buttonActive: true,
          helperColor: colors.transparent,
        });
      } else {
        this.setState({
          buttonActive: false,
          helperText: Accounts.ImportAccount.HELPER_ERROR_NOT_VALID,
          helperColor: colors.alertTextRed,
        });
      }
    }
  }

  render() {
    const {
      helperText,
      helperColor,
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
              action: NavAction.popScreen(2),
            },
          }}
        />
        <ScrollView
          contentContainerStyle={[styles.defaultLayout, styles.alignCenter]}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.layoutHead, styles.headText]}>
            가져올 계좌의 보안키를 입력해 주세요
          </Text>
          <InputText
            ref={(c) => { this.input = c; }}
            label="보안키"
            placeholder={Accounts.ImportAccount.PLACEHOLDER_SECURE}
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
            onFocus={this.onFocus}
            onEndEditing={this.onEndEditing}
            onChangeText={this.onChangeText()}
          />
          <NotiPanel
            texts={[
              helperText,
            ]}
            color={helperColor}
          />
          <View style={styles.filler} />
          <View style={styles.footer}>
            <NotiPanel
              texts={[
                '* 보안키는 본인 외에 아무도 알 수 없습니다',
                '* 보안키를 잊어버린 경우 보안키로 Account를 가져올 수 없으\n'
                + '   오니 복구키로 Account 가져오기를 이용해 주시기 바랍니다\n',
              ]}
            />
          </View>
          <BottomButton
            actions={[
              {
                text: '다음',
                action: NavAction.pushScreen(
                  NavAction.Screens.SET_PASSWORD,
                  {
                    getSecureKey: () => this.input.getWrappedInstance().getText(),
                  },
                ),
              },
            ]}
            inactive={!buttonActive}
          />
        </ScrollView>
      </View>
    );
  }
}

ImportBySecure.navigationOptions = {
  header: null,
};

export default ImportBySecure;
