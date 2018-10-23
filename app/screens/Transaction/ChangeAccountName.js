import React from 'react';
import { View, Text, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';

import { Navigation as NavAction, Accounts as AccountsAction } from '../../actions';
import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton, TextButton } from '../../components/Button';
import { NotiPanel } from '../../components/Panel';
import { InputText } from '../../components/Input';
import AppStorage from '../../libs/AppStorage';

import { colors } from '../../resources';
import strings from '../../resources/strings';

class ChangeAccountName extends React.Component {
  constructor(props) {
    super(props);

    const { settings } = this.props;
    const { navigation } = this.props;
    const Strings = strings[settings.language].Accounts.ChangeAccountName;

    this.state = {
      settings,
      account: navigation.getParam('account', null),
      helperText: Strings.HELPER_DEFAULT,
      helperColor: colors.transparent,
      buttonActive: false,
    };

    this.onFocus = this.onFocus.bind(this);
    this.callbackBottomButton = this.callbackBottomButton.bind(this);
  }

  componentDidMount() {
    const { account } = this.state;
    const { accounts } = this.props;
    this.input.getWrappedInstance().setText(accounts[account.index].name);
  }

  onFocus() {
    const { helperColor } = this.state;
    const { settings } = this.props;
    const Strings = strings[settings.language].Accounts.ChangeAccountName;

    const text = this.input.getWrappedInstance().getText();
    if (helperColor === colors.transparent) {
      this.setState({
        helperText: Strings.HELPER_DEFAULT,
        helperColor: colors.textAreaNotiTextGray,
      });
    }
  }

  callbackBottomButton() {
    const { doAction, accounts } = this.props;
    const { account } = this.state;
    const text = this.input.getWrappedInstance().getText();

    doAction(AccountsAction.changeName(account.index, text));

    AppStorage.saveAccountAsync(accounts)
      .then(() => {
        doAction(NavAction.popScreen());
      })
      .catch(() => {
        ToastAndroid.show('저장에 실패하였습니다. 다시 시도해 주세요.', ToastAndroid.SHORT);
      });
  }

  render() {
    const { settings } = this.props;
    const { account, helperColor, helperText, buttonActive } = this.state;
    const Strings = strings[settings.language].Accounts.ChangeAccountName;

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
              actionText: '취소',
              action: NavAction.popScreen(),
            },
          }}
        />
        <View style={styles.defaultLayout}>
          <Text style={[styles.layoutHead, styles.headText]}>
            {Strings.HEAD_TEXT}
          </Text>
          <InputText
            ref={(c) => { this.input = c; }}
            label={Strings.INPUT_LABEL}
            placeholder={Strings.INPUT_PLACEHOLDER}
            onFocus={this.onFocus}
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
                Strings.NOTICE,
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

ChangeAccountName.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  accounts: state.accounts.list,
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeAccountName);
