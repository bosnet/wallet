import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';
import { colors, types } from '../../resources';
import strings from '../../resources/strings';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BalancePanel } from '../../components/Panel';
import { PanelButton, LongButton } from '../../components/Button';
import { Navigation as NavAction, Accounts as AccountsAction } from '../../actions';
import { retrieveAccount, retrieveTransactions } from '../../libs/Transactions';
import { ItemList } from '../../components/List';
import AndroidBackHandler from '../../AndroidBackHandler';


const formatDate = (rawDate) => {
  const d = new Date(rawDate);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();

  const dateString = [
    year,
    (month > 9 ? '' : '0') + month,
    (date > 9 ? '' : '0') + date,
  ].join('.');

  const hours = d.getHours();
  const mins = d.getMinutes();

  const timeString = [
    (hours > 9 ? '' : '0') + hours,
    (mins > 9 ? '' : '0') + mins,
  ].join(':');

  return `${dateString} ${timeString}`;
};

class TransactionList extends React.Component {
  constructor(props) {
    super(props);

    const { navigation, accounts } = this.props;
    const account = navigation.getParam('account', null);

    this.state = {
      isLoaded: false,
      isLoading: false,
      account,
      transactions: [],
      isValid: false,
      page: 0,
    };

    this.renderNotValid = this.renderNotValid.bind(this);
    this.updateAccountData = this.updateAccountData.bind(this);
    this.renderTransactionList = this.renderTransactionList.bind(this);
  }

  componentDidMount() {
    const { updateFlags, doAction } = this.props;

    doAction(AccountsAction.addUpdateFlag(NavAction.Screens.TRANSACTION_LIST));
  }

  componentWillUnmount() {
    const { updateFlags, doAction } = this.props;
    doAction(AccountsAction.removeUpdateFlag(NavAction.Screens.TRANSACTION_LIST));
  }

  updateAccountData(updateFlag) {
    const { account, isLoading } = this.state;
    const { navigation, accounts, addressBook, doAction } = this.props;

    const { settings } = this.props;
    const Strings = strings[settings.language].Transactions.TransactionList;

    if (!navigation.isFocused()) return;

    if (isLoading) return;

    this.setState({
      isLoading: true,
    });

    doAction(AccountsAction.unsetUpdateFlag(NavAction.Screens.TRANSACTION_LIST));

    retrieveAccount(account.address)
      .then((data) => {
        const index = accounts.map(e => e.address).indexOf(account.address);

        const storedData = accounts[index];
        storedData.index = index;

        if (data.status === 429) {
          ToastAndroid.show(Strings.TOAST_ON_DELAY, ToastAndroid.SHORT);
          this.setState({
            isLoaded: false,
          });
          storedData.balance = NaN;
        }

        if (data.status !== 404) {
          this.setState({
            isValid: true,
          });
          storedData.balance = data.balance;
        } else {
          this.setState({
            isValid: false,
            isLoaded: true,
          });
          storedData.balance = data.balance;
        }

        this.setState({
          account: storedData,
        });
      });

    retrieveTransactions(account.address, 100)
      .then((results) => {

        if (results.status === 404) {
          return;
        }

        if (results.status === 429) {
          ToastAndroid.show(Strings.TOAST_ON_DELAY, ToastAndroid.SHORT);
          return;
        }

        const data = [];
        results.forEach((result) => {
          const object = {
            type: types.ListItem.TRANSACTION,
            date: formatDate(result.date),
            txHash: result.txHash,
            fee: result.fee,
          };
          if (result.source === account.address) { // 출금
            const index = addressBook.map(e => e.address).indexOf(result.target);

            if (index >= 0) {
              object.name = addressBook[index].name;
            } else {
              const accIndex = accounts.map(e => e.address).indexOf(result.target);

              if (accIndex >= 0) {
                object.name = accounts[accIndex].name;
              } else {
                object.name = '';
              }
            }

            object.address = result.target;
            object.amount = Number(-result.amount - result.fee).toFixed(7).replace(/[0]+$/, '').replace(/[.]+$/, '');
            object.textColor = colors.itemTextRed;
          }

          if (result.target === account.address) { // 입금
            if (result.type === 'create-account') {
              object.title = Strings.LABEL_CREATED;
            }
            const index = addressBook.map(e => e.address).indexOf(result.source);
            if (index >= 0) {
              object.name = addressBook[index].name;
            } else {
              object.name = '';
            }

            object.address = result.source;
            object.textColor = colors.itemTextBlue;
            object.amount = result.amount;
          }

          data.push(object);
        });

        this.setState({
          transactions: data,
          isLoading: false,
          isLoaded: true,
        });
      });
  }

  renderNotValid() {
    const { account, isLoaded } = this.state;
    const { settings } = this.props;
    const Strings = strings[settings.language].Transactions.TransactionList;

    if (!isLoaded) return null;

    return (
      <View
        style={{
          alignContent: 'center',
        }}
      >
        <Text
          style={[
            styles.layoutHead,
            {
              fontSize: 18,
              fontFamily: 'SpoqaHanSans-Regular',
              color: colors.layoutHeadText,
              textAlign: 'center',
              marginHorizontal: 24,
            }]}
        >
          {Strings.INVALID_ACCOUNT_NOTI}
        </Text>
        <View
          style={{
            alignItems: 'center',
            marginHorizontal: 10,
          }}
        >
          <LongButton
            text={Strings.INVALID_ACCOUNT_BUTTON}
            backgroundColor={colors.buttonWhite}
            textColor={colors.buttonTextPurple}
            action={NavAction.pushScreen(NavAction.Screens.RECEIVE_BALANCE, { account })}
          />

        </View>
      </View>
    );
  }

  renderTransactionList() {
    const { transactions, isLoaded } = this.state;

    if (isLoaded) {
      return (
        <ItemList
          listType={types.ListType.FLAT}
          listData={{
            data: transactions,
          }}
          onScrollEndDrag={(event) => {
            const contentOffset = event.nativeEvent.contentOffset.y;
            const layoutMeasurement = event.nativeEvent.layoutMeasurement.height;
            const contentSize = event.nativeEvent.contentSize.height;

            if (layoutMeasurement + contentOffset >= contentSize) {
              // console.log("end");
            }
          }}
        />
      );
    }

    return null;
  }

  render() {
    const { account, transactions, isValid } = this.state;
    const { pushScreen, updateFlags, doAction } = this.props;

    const { settings } = this.props;
    const Strings = strings[settings.language].Transactions.TransactionList;

    if (updateFlags[NavAction.Screens.TRANSACTION_LIST]) { // Need Update
      doAction(AccountsAction.unsetUpdateFlag(NavAction.Screens.TRANSACTION_LIST));
      this.updateAccountData();
    }

    return (
      <View style={styles.container}>
        <AppStatusBar theme={StatusBarTheme.WHITE} />
        <DefaultToolbar
          theme={DefaultToolbarTheme.WHITE}
          data={{
            left: {
              hasArrow: true,
              title: account ? account.name : '',
            },
            right: {
              actionText: Strings.ACTION_SETTING,
              action: NavAction.pushScreen(NavAction.Screens.TRANSACTION_MANAGE, { account }),
            },
          }}
        />
        <View
          style={[styles.alignCenter, styles.defaultLayout]}
        >
          <BalancePanel
            text={account.balance}
          />
          <PanelButton
            buttons={[
              {
                text: Strings.BUTTON_SEND,
                onPress: () => {
                  if (account.balance <= 0) {
                    ToastAndroid.show(Strings.TOAST_ACCOUNT_NOT_AVAILABLE, ToastAndroid.SHORT);
                    // return;
                  }
                  pushScreen(NavAction.Screens.SEND_BALANCE, { account })
                },
              },
              {
                text: Strings.BUTTON_RECEIVE,
                onPress: () => pushScreen(NavAction.Screens.RECEIVE_BALANCE, { account }),
              },
            ]}
          />
          <View
            style={{
              flex: 1,
              alignSelf: 'stretch',
              // marginBottom: 10,
            }}
          >
            { !isValid ? this.renderNotValid() : this.renderTransactionList(transactions)}
          </View>
        </View>
        <AndroidBackHandler />
      </View>
    );
  }
}

TransactionList.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  accounts: state.accounts.list,
  addressBook: state.addressBook.list,
  updateFlag: state.accounts.updateFlag,
  updateFlags: state.accounts.updateFlags,
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  pushScreen: (screen, params) => dispatch(NavAction.pushScreen(screen, params)),
  doAction: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);
