import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';
import strings from '../../resources/strings';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { TextArea } from '../../components/Text';
import { colors, types } from '../../resources';
import { Navigation as NavAction } from '../../actions';
import { SelectableList } from '../../components/List';
import { retrieveAccount, retrieveTransactions } from '../../libs/Transactions';
import AndroidBackHandler from '../../AndroidBackHandler';

class SelectWithdrawAccount extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;

    this.state = {
      list: [],
      isLoaded: false,
      callback: navigation.getParam('callback', null),
    };

    this.buildAccountList = this.buildAccountList.bind(this);
    this.callbackBottomButton = this.callbackBottomButton.bind(this);
  }

  componentDidMount() {
    this.buildAccountList();
  }

  buildAccountList() {
    const { accounts } = this.props;
    const promises = [];

    accounts.forEach((account, index) => {
      promises.push(retrieveAccount(account.address));
    });

    Promise.all(promises)
      .then((results) => {
        const returnArray = [];
        results.forEach((account, index) => {
          if (account.balance > 0) {
            returnArray.push({
              listKey: `${index}`,
              type: types.ListItem.ACCOUNT,
              name: accounts[index].name,
              address: accounts[index].address,
              balance: account.balance,
              account,
            });
          }
        });

        this.setState({
          list: returnArray,
          isLoaded: true,
        });
      });
  }

  callbackBottomButton() {
    const { callback } = this.state;
    const { doAction, navigation, accounts } = this.props;
    const address = navigation.getParam('address', null);

    const item = this.list.getSelected();

    if (!item) return;

    const index = accounts.map(e => e.address).indexOf(item.account.address);

    accounts[index].balance = item.balance;

    if (callback) {
      callback(accounts[index]);
      doAction(NavAction.popScreen());
    } else {
      doAction(NavAction.pushScreen(
        NavAction.Screens.SEND_BALANCE,
        { account: accounts[index], address },
      ));
    }
  }

  renderList() {
    const { list, isLoaded } = this.state;
    const { settings } = this.props;
    const Strings = strings[settings.language].Transactions.SelectWithdraw;

    if (isLoaded) {
      return (
        <SelectableList
          ref={(c) => { this.list = c; }}
          listData={{
            data: list,
          }}
          noDataText={Strings.NOTI_NO_ADDRESS}
        />
      );
    }
    return null;
  }


  render() {
    const { list, isLoaded } = this.state;
    const { settings } = this.props;
    const Strings = strings[settings.language].Transactions.SelectWithdraw;

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
        <ScrollView
          contentContainerStyle={styles.alignCenter}
          showsVerticalScrollIndicator={false}
        >
          {this.renderList()}
          <View style={{ marginBottom: 10 }} />
        </ScrollView>
        <BottomButton
          actions={[
            {
              text: Strings.BUTTON_TEXT_OK,
              callback: this.callbackBottomButton,
            },
          ]}
        />
        <AndroidBackHandler />
      </View>
    );
  }
}

SelectWithdrawAccount.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  accounts: state.accounts.list,
  settings: state.settings,
});


const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectWithdrawAccount);
