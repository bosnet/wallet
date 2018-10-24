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

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BalancePanel } from '../../components/Panel';
import { PanelButton, LongButton } from '../../components/Button';
import { Navigation as NavAction, Accounts as AccountsAction } from '../../actions';
import { retrieveAccount, retrieveTransactions } from '../../libs/Transactions';
import { ItemList } from '../../components/List';

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

  const time = `${d.getHours()}:${d.getMinutes()}`;

  return `${dateString} ${time}`;
};

class TransactionList extends React.Component {
  constructor(props) {
    super(props);

    const { navigation, accounts } = this.props;
    const account = navigation.getParam('account', null);

    this.state = {
      isLoaded: false,
      account,
      transactions: [],
    };

    this.renderNotValid = this.renderNotValid.bind(this);
    this.updateAccountData = this.updateAccountData.bind(this);
  }

  componentDidMount() {
    const { updateFlags, doAction } = this.props;

    doAction(AccountsAction.addUpdateFlag(NavAction.Screens.TRANSACTION_LIST));
    this.updateAccountData();
  }

  componentWillUnmount() {
    const { updateFlags, doAction } = this.props;
    doAction(AccountsAction.removeUpdateFlag(NavAction.Screens.TRANSACTION_LIST));
  }

  updateAccountData(updateFlag) {
    const { account, transactions } = this.state;
    const { navigation, accounts, addressBook, doAction } = this.props;


    doAction(AccountsAction.setUpdateFlag(NavAction.Screens.TRANSACTION_LIST));

    retrieveAccount(account.address)
      .then((data) => {
        let storedData = accounts[account.index];
        storedData.index = account.index;
        storedData.balance = data.balance;

        this.setState({
          account: storedData,
        });
      });

    retrieveTransactions(account.address)
      .then((results) => {
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
              object.name = '';
            }

            object.address = result.target;
            object.amount = -result.amount;
            object.textColor = colors.itemTextRed;
          }

          if (result.target === account.address) { // 입금
            if (result.type === 'create-account') {
              object.title = '계좌 생성';
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
          isLoaded: true,
        });
      });
  }

  renderNotValid() {
    const { account } = this.state;
    return (
      <View>
        <Text
          style={[
            styles.layoutHead,
            {
              fontSize: 20,
              fontFamily: 'SpoqaHanSans-Regular',
              color: colors.layoutHeadText,
              textAlign: 'center',
            }]}
        >
          {'이 계좌를 유효한 계좌로 만들기 위해\n최소 잔액(0.1BOS)이 있어야 합니다\n공개 주소로 최소 잔액 0.1 BOS를\n받으세요'}
        </Text>
        <LongButton
          text="0.1 BOS 받기"
          backgroundColor={colors.buttonWhite}
          textColor={colors.buttonTextPurple}
          action={NavAction.pushScreen(NavAction.Screens.RECEIVE_BALANCE, { account })}
        />
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
        />
      );
    }

    return null;
  }

  render() {
    const { account, transactions } = this.state;
    const { pushScreen, updateFlags, doAction } = this.props;

    if (updateFlags[NavAction.Screens.TRANSACTION_LIST]) { // Need Update
      doAction(AccountsAction.setUpdateFlag(NavAction.Screens.TRANSACTION_LIST));
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
              actionText: '관리',
              action: NavAction.pushScreen(NavAction.Screens.TRANSACTION_MANAGE, { account }),
            },
          }}
        />
        <ScrollView
          contentContainerStyle={styles.alignCenter}
          showsVerticalScrollIndicator={false}
        >
          <BalancePanel
            text={account.balance ? account.balance : 0}
          />
          <PanelButton
            buttons={[
              {
                text: '보내기',
                onPress: () => pushScreen(NavAction.Screens.SEND_BALANCE, { account }),
              },
              {
                text: '받기',
                onPress: () => pushScreen(NavAction.Screens.RECEIVE_BALANCE, { account }),
              },
            ]}
          />
          {account.balance <= 0 ? this.renderNotValid() : this.renderTransactionList(transactions)}
        </ScrollView>
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
});

const mapDispatchToProps = dispatch => ({
  pushScreen: (screen, params) => dispatch(NavAction.pushScreen(screen, params)),
  doAction: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);
