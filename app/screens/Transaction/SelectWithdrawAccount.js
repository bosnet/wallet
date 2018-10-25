import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { BottomButton } from '../../components/Button';
import { TextArea } from '../../components/Text';
import { colors, types } from '../../resources';
import { Navigation as NavAction } from '../../actions';
import { SelectableList } from '../../components/List';
import { retrieveAccount, retrieveTransactions } from '../../libs/Transactions';

class SelectWithdrawAccount extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;

    this.state = {
      list: [],
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
          returnArray.push({
            listKey: `${index}`,
            type: types.ListItem.ACCOUNT,
            name: accounts[index].name,
            address: accounts[index].address,
            balance: account.balance,
            account,
          });
        });

        this.setState({
          list: returnArray,
        });
      });
  }

  callbackBottomButton() {
    const { callback } = this.state;
    const { doAction } = this.props;

    const item = this.list.getSelected();

    if (callback) {
      callback(item.account);
      doAction(NavAction.popScreen());
    } else {
      doAction(NavAction.pushScreen(NavAction.Screens.SEND_BALANCE, { account: item.account }));
    }
  }


  render() {
    const { list } = this.state;

    return (
      <View style={styles.container}>
        <AppStatusBar theme={StatusBarTheme.PURPLE} />
        <DefaultToolbar
          theme={DefaultToolbarTheme.PURPLE}
          data={{
            center: {
              title: '출금계좌 선택',
            },
            right: {
              actionText: '취소',
              action: NavAction.popScreen(),
            },
          }}
        />
        <ScrollView
          contentContainerStyle={styles.alignCenter}
          showsVerticalScrollIndicator={false}
        >
          <SelectableList
            ref={(c) => { this.list = c; }}
            listData={{
              data: list,
            }}
            noDataText="아직 등록된 주소가 없습니다"
          />
          <View style={{ marginBottom: 10 }} />
        </ScrollView>
        <BottomButton
          actions={[
            {
              text: '확인',
              callback: this.callbackBottomButton,
            },
          ]}
        />
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
