import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ToastAndroid, Keyboard } from 'react-native';
import RNKeyboard from 'react-native-keyboard';

import styles from '../styles';
import strings from '../../resources/strings';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { WithdrawablePanel, NotiPanel } from '../../components/Panel';
import { Navigation as NavAction } from '../../actions';
import { InputText, InputBalance } from '../../components/Input';
import { colors } from '../../resources';

import { TRANSACTION_FEE, MINIMUM_BALANCE } from '../../config/transactionConfig';
import AndroidBackHandler from '../../AndroidBackHandler';

const checkDotRange = (balance) => {
  if (balance.toString().indexOf('.') > -1) { // Has Dot
    return balance.toString().match(/[0-9][.][0-9]{0,7}$/);
  }

  return true;
};

const checkValidBalance = (balance) => {
  const commas = balance.toString().match(/[.]/g);
  if (commas && commas.length > 1) { // Has Many(2+) Dot
    return false;
  }

  if (balance.toString().match(/[^0-9.]/)) {
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

    const { settings } = this.props;
    const Strings = strings[settings.language].Transactions.SendBalance;

    this.state = {
      account,
      maxSendable: account ? account.balance : '',
      balanceNotiColor: colors.textAreaNotiTextGray,
      balanceNotiText: Strings.HELPER_BALANCE_DEFAULT,

      addressNotiColor: colors.textAreaNotiTextGray,
      addressNotiText: Strings.HELPER_ADDRESS_DEFAULT,

      buttonActive: false,
    };

    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeBalance = this.onChangeBalance.bind(this);
    this.onEndEditBalance = this.onEndEditBalance.bind(this);
    this.onFocusAddress = this.onFocusAddress.bind(this);
    this.onEndEditAddress = this.onEndEditAddress.bind(this);
    this.selectWithdrawCallback = this.selectWithdrawCallback.bind(this);
    this.bottomButtonCallback = this.bottomButtonCallback.bind(this);
    this.onNavigateWithResult = this.onNavigateWithResult.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { account } = this.state;
    const address = navigation.getParam('address', null);

    console.log(JSON.stringify(account));

    if (address) {
      this.inputAddress.getWrappedInstance().setText(address);
    }
  }

  onFocusAddress() {
    const { pushScreen } = this.props;
    const { account } = this.state;

    Keyboard.dismiss();
    pushScreen(
      NavAction.Screens.RECEIVE_ACCOUNT,
      {
        callback: this.onNavigateWithResult,
        account,
      },
    );
  }

  onChangeAddress(address) {
    const amount = this.inputBalance.getText();

    this.setState({
      buttonActive: (address.length > 0 && amount.length > 0),
    });
  }

  onChangeBalance(balance) {
    const input = this.inputAddress.getWrappedInstance().getText();

    this.setState({
      buttonActive: (balance.length > 0 && input.length > 0),
    });
  }

  onEndEditAddress() {
    const text = this.inputAddress.getWrappedInstance().getText();
  }

  onEndEditBalance() {
    this.validateBalance();
  }

  onNavigateWithResult(key) {
    this.inputAddress.getWrappedInstance().setText(key.toString());

    this.onChangeAddress(key.toString());
  }

  validateBalance() {
    const text = this.inputBalance.getText();
    const { maxSendable } = this.state;

    const { settings } = this.props;
    const Strings = strings[settings.language].Transactions.SendBalance;


    if (text.length === 0) {
      this.setState({
        balanceNotiText: Strings.HELPER_BALANCE_ERROR_NO_INPUT,
        balanceNotiColor: colors.alertTextRed,
      });
      return false;
    }

    if (!checkValidBalance(text)) {
      this.setState({
        balanceNotiText: Strings.HELPER_BALANCE_ERROR_NOT_VALID,
        balanceNotiColor: colors.alertTextRed,
      });
      return false;
    }

    if (!checkDotRange(text)) {
      this.setState({
        balanceNotiText: Strings.HELPER_BALANCE_ERROR_DOT_RANGE,
        balanceNotiColor: colors.alertTextRed,
      });
      return false;
    }

    if (parseFloat(text) >= Number(maxSendable) - 0.01) {
      this.setState({
        balanceNotiText: Strings.HELPER_BALANCE_ERROR_RANGE,
        balanceNotiColor: colors.alertTextRed,
      });
      return false;
    }

    this.setState({
      balanceNotiText: Strings.HELPER_BALANCE_DEFAULT,
      balanceNotiColor: colors.transparent,
    });

    return true;
  }

  selectWithdrawCallback(account) {
    this.setState({
      account,
      maxSendable: account.balance,
    });
  }

  bottomButtonCallback() {
    const { pushScreen } = this.props;
    const { account } = this.state;
    const { settings } = this.props;
    const Strings = strings[settings.language].Transactions.SendBalance;

    const target = this.inputAddress.getWrappedInstance().getText();
    const amount = this.inputBalance.getText();

    let errorFlag = false;

    if (!this.validateBalance()) {
      errorFlag = true;
    }

    if (target.length === 0) {
      this.setState({
        addressNotiText: Strings.HELPER_ADDRESS_ERROR_NO_INPUT,
        addressNotiColor: colors.alertTextRed,
      });

      ToastAndroid.show(Strings.TOAST_NO_ADDRESS, ToastAndroid.SHORT);

      errorFlag = true;
    } else {
      this.setState({
        addressNotiText: Strings.HELPER_ADDRESS_DEFAULT,
        addressNotiColor: colors.transparent,
      });
    }

    if (errorFlag) return;


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
      buttonActive,
    } = this.state;

    const { settings } = this.props;
    const Strings = strings[settings.language].Transactions.SendBalance;

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
            subLabel={`${Strings.LABEL_FEE} ${TRANSACTION_FEE} BOS`}
            placeholder={Strings.BALANCE_INPUT_PLACEHOLDER}
            keyboardType="numeric"
            textColor={colors.textAreaContentsNavy}
            onEndEditing={this.onEndEditBalance}
            onChangeText={this.onChangeBalance}
          />
          <NotiPanel
            texts={[
              balanceNotiText,
            ]}
            color={balanceNotiColor}
            noStar
          />
          <InputText
            ref={(c) => { this.inputAddress = c; }}
            label={(<Text style={styles.textBold}>{Strings.ADDRESS_INPUT_LABEL}</Text>)}
            labelColor={colors.labelTextBlack}
            placeholder={Strings.ADDRESS_INPUT_PLACEHOLDER}
            multiline
            onFocus={this.onFocusAddress}
            onEndEditing={this.onEndEditAddress}
            onChangeText={this.onChangeAddress}
          />
          <NotiPanel
            texts={[
              addressNotiText,
            ]}
            color={addressNotiColor}
            noStar
          />

          <View style={styles.filler} />
          <BottomButton
            actions={[
              {
                text: Strings.BUTTON_TEXT_OK,
                callback: this.bottomButtonCallback,
              },
            ]}
            inactive={!buttonActive}
          />
        </View>
        <AndroidBackHandler />
      </View>
    );
  }
}

SendBalance.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  pushScreen: (screen, params) => dispatch(NavAction.pushScreen(screen, params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SendBalance);
