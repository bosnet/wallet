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
    const { navigation, accounts, doAction } = this.props;

    doAction(AccountsAction.setUpdateFlag(NavAction.Screens.TRANSACTION_LIST));

    retrieveAccount(account.address)
      .then((data) => {
        let storedData = accounts[account.index];
        storedData.index = account.index;
        storedData.balance = data.balance;

        this.setState({
          account: storedData,
          isLoaded: true,
        });
      });

    retrieveTransactions(account.address)
      .then((data) => {
        ToastAndroid.show(JSON.stringify(data), ToastAndroid.LONG);
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
    const { account } = this.state;
    return (
      <ItemList
        listType={types.ListType.FLAT}
        listData={{
          data: [
            {
              title: '계좌 생성',
              accountName: 'Account 001 G4L',
              date: '2018.02.28   13:47',
              textColor: colors.itemTextBlue,
              amount: '-538',
              type: types.ListItem.TRANSACTION,
              key: '2',
            },
          ],
        }}
      />
    );
  }

  render() {
    const { account, isLoaded } = this.state;
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
          {account.balance <= 0 ? this.renderNotValid() : null}
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
  updateFlag: state.accounts.updateFlag,
  updateFlags: state.accounts.updateFlags,
});

const mapDispatchToProps = dispatch => ({
  pushScreen: (screen, params) => dispatch(NavAction.pushScreen(screen, params)),
  doAction: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);
