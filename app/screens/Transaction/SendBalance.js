import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ToastAndroid, Keyboard } from 'react-native';

import styles from '../styles';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { WithdrawablePanel, NotiPanel } from '../../components/Panel';
import { Navigation as NavAction } from '../../actions';
import { InputText, InputBalance } from '../../components/Input';
import { colors } from '../../resources';
import { Transactions } from '../../resources/strings/ko';

import { TRANSACTION_FEE, MINIMUM_BALANCE } from '../../config/transactionConfig';

const Strings = Transactions.SendBalance;

const checkDotRange = (balance) => {
  if (balance.toString().indexOf('.') > -1) { // Has Dot
    return balance.toString().match(/[0-9][.][0-9]{0,7}$/);
  }

  return true;
};

const checkValidBalance = (balance) => {
  if (balance.toString().match(/./g) > 1) { // Has Many(2+) Dot
    return false;
  }

  if (balance.toString().match(/[^0-9.]|^[^0-9]/)) {
    return false;
  }

  return true;
};

const getMaxSendable = (balance) => {
  if (balance > 0.1) return (balance - MINIMUM_BALANCE - TRANSACTION_FEE);

  return 0;
};

class SendBalance extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;
    const account = navigation.getParam('account', null);

    this.state = {
      account,
      maxSendable: account ? getMaxSendable(account.balance) : '',
      balanceNotiColor: colors.textAreaNotiTextGray,
      balanceNotiText: Strings.HELPER_BALANCE_DEFAULT,

      addressNotiColor: colors.textAreaNotiTextGray,
      addressNotiText: Strings.HELPER_ADDRESS_DEFAULT,
    };

    this.onChangeBalance = this.onChangeBalance.bind(this);
    this.onEndEditBalance = this.onEndEditBalance.bind(this);
    this.onFocusAddress = this.onFocusAddress.bind(this);
    this.onEndEditAddress = this.onEndEditAddress.bind(this);
    this.selectWithdrawCallback = this.selectWithdrawCallback.bind(this);
    this.bottomButtonCallback = this.bottomButtonCallback.bind(this);
    this.onNavigateWithResult = this.onNavigateWithResult.bind(this);
  }

  onChangeBalance(text) {
    if (!checkDotRange(text)) {
      this.inputBalance.setText(text.slice(0, -1));
    }
  }

  onFocusAddress() {
    const { pushScreen } = this.props;

    Keyboard.dismiss();
    pushScreen(
      NavAction.Screens.RECEIVE_ACCOUNT,
      {
        callback: this.onNavigateWithResult,
      },
    );
  }

  onEndEditAddress() {
    const text = this.inputAddress.getWrappedInstance().getText();
  }

  onEndEditBalance() {
    const text = this.inputBalance.getText();
    const { maxSendable } = this.state;

    if (text.length === 0) {
      this.setState({
        balanceNotiText: Strings.HELPER_BALANCE_ERROR_NO_INPUT,
        balanceNotiColor: colors.alertTextRed,
      });
      return;
    }

    if (!checkValidBalance(text)) {
      this.setState({
        balanceNotiText: Strings.HELPER_BALANCE_ERROR_NOT_VALID,
        balanceNotiColor: colors.alertTextRed,
      });
      return;
    }

    if (!checkDotRange(text)) {
      this.setState({
        balanceNotiText: Strings.HELPER_BALANCE_ERROR_DOT_RANGE,
        balanceNotiColor: colors.alertTextRed,
      });
      return;
    }

    if (parseFloat(text) > maxSendable) {
      this.setState({
        balanceNotiText: Strings.HELPER_BALANCE_ERROR_RANGE,
        balanceNotiColor: colors.alertTextRed,
      });
      return;
    }

    this.setState({
      balanceNotiText: Strings.HELPER_BALANCE_DEFAULT,
      balanceNotiColor: colors.transparent,
    });
  }

  onNavigateWithResult(key) {
    this.inputAddress.getWrappedInstance().setText(key.toString());
  }

  selectWithdrawCallback(account) {
    this.setState({
      account,
      maxSendable: getMaxSendable(account.balance),
    });
  }

  bottomButtonCallback() {
    const { pushScreen } = this.props;
    const { account } = this.state;

    const target = this.inputAddress.getWrappedInstance().getText();
    const amount = this.inputBalance.getText();

    pushScreen(
      NavAction.Screens.BEFORE_TRANSACTION,
      {
        account,
        target,
        amount,
      },
    );
  }

  render() {
    const {
      maxSendable,
      balanceNotiText,
      balanceNotiColor,
      addressNotiText,
      addressNotiColor,
    } = this.state;

    return (
      <View style={styles.container}>
        <AppStatusBar theme={StatusBarTheme.PURPLE} />
        <DefaultToolbar
          theme={DefaultToolbarTheme.PURPLE}
          data={{
            center: {
              title: '보내기',
            },
            right: {
              actionText: '닫기',
              action: NavAction.popScreen(),
            },
          }}
        />
        <View style={styles.defaultLayout}>
          <WithdrawablePanel
            title={Strings.WITHDRAWABLE_LABEL}
            amount={maxSendable}
            action={NavAction.pushScreen(
              NavAction.Screens.SELECT_WITHDRAW_ACCOUNT,
              {
                callback: this.selectWithdrawCallback,
              },
            )}
          />
          <InputBalance
            ref={(c) => { this.inputBalance = c; }}
            label={Strings.BALANCE_INPUT_LABEL}
            subLabel={`수수료 ${TRANSACTION_FEE} BOS`}
            placeholder={Strings.BALANCE_INPUT_PLACEHOLDER}
            keyboardType="numeric"
            textColor={colors.textAreaContentsNavy}
            onChangeText={this.onChangeBalance}
            onEndEditing={this.onEndEditBalance}
          />
          <NotiPanel
            texts={[
              balanceNotiText,
            ]}
            color={balanceNotiColor}
          />
          <InputText
            ref={(c) => { this.inputAddress = c; }}
            label={(<Text style={styles.textBold}>{Strings.ADDRESS_INPUT_LABEL}</Text>)}
            labelColor={colors.labelTextBlack}
            placeholder={Strings.ADDRESS_INPUT_PLACEHOLDER}
            multiline
            onFocus={this.onFocusAddress}
            onEndEditing={this.onEndEditAddress}
          />
          <NotiPanel
            texts={[
              addressNotiText,
            ]}
            color={addressNotiColor}
          />

          <View style={styles.filler} />
          <BottomButton
            actions={[
              {
                text: '확인',
                callback: this.bottomButtonCallback,
              },
            ]}
          />
        </View>
      </View>
    );
  }
}

SendBalance.navigationOptions = {
  header: null,
};

const mapDispatchToProps = dispatch => ({
  pushScreen: (screen, params) => dispatch(NavAction.pushScreen(screen, params)),
});

export default connect(null, mapDispatchToProps)(SendBalance);
