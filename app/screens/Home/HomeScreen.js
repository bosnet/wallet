import React from 'react';
import {
  ScrollView, View,
  ToastAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import styles from '../styles';
import { colors, types } from '../../resources';
import { Modal as ModalAction, Accounts as AccountsAction, Navigation as NavAction } from '../../actions';
import { retrieveAccount } from '../../libs/Transactions';

import { Theme, AppStatusBar } from '../../components/StatusBar';
import { HomeToolbar } from '../../components/Toolbar';
import { LoadingPanel } from '../../components/Panel';
import { ItemList } from '../../components/List';
import { BalanceArea } from '../../components/Text';
import { HomeIntro } from '../../components/Modal';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;

    this.state = {
      list: [],
      isLoaded: false,
      isLoading: false,
      timer: null,
      counter: 60,
      totalBalance: '',
    };

    this.buildAccountList = this.buildAccountList.bind(this);
    this.renderAccountList = this.renderAccountList.bind(this);
    this.loadAccounts = this.loadAccounts.bind(this);
  }

  componentDidMount() {
    const { updateFlags, doAction } = this.props;

    doAction(AccountsAction.addUpdateFlag(NavAction.Screens.HOME));
    this.loadAccounts();

    SplashScreen.hide();
  }

  componentWillUnmount() {
    const { updateFlags, doAction } = this.props;
    const { timer } = this.state;
    if (timer) this.clearInterval(timer);
    doAction(AccountsAction.removeUpdateFlag(NavAction.Screens.HOME));
  }

  loadAccounts() {
    const { showModal, accounts, doAction } = this.props;
    doAction(AccountsAction.setUpdateFlag(NavAction.Screens.HOME));
    // 튜토리얼 표시
    if (!accounts || accounts.length === 0) showModal();

    // 계정 정보 로드
    Promise.all(
      accounts.map((account, index) => (
        retrieveAccount(account.address)
          .then(data => ({
            ...account,
            index,
            balance: data.balance,
          }))
      )),
    ).then((results) => {
      let total = 0;

      results.forEach((account) => {
        total += Number(account.balance);
      });

      this.setState({
        isLoaded: true,
        list: results,
        totalBalance: total,
      });
    });
  }

  buildAccountList() {
    const { list } = this.state;
    const listArray = [];
    list.forEach((account, index) => {
      listArray.push({
        listKey: `${index}`,
        type: types.ListItem.ACCOUNT,
        account,
      });
    });

    return listArray;
  }

  renderAccountList(isLoaded, updateFlag) {
    if (isLoaded) {
      return (
        <ScrollView
          contentContainerStyle={styles.alignCenter}
          showsVerticalScrollIndicator={false}
        >
          <ItemList
            listType={types.ListType.FLAT}
            listData={{
              data: this.buildAccountList(),
            }}
            noDataText={
              '아직 등록된\n'
              + 'Account가 없습니다'
            }
          />
        </ScrollView>
      );
    }
    return null;
  }
  
  renderLoadingPanel() {
    const { counter, isLoading } = this.state;

    if (isLoading) {
      return (
        <LoadingPanel
          text="네트워크 동기화 중"
          subText={`${counter}초`}
        />
      );
    }
    return null;
  }

  render() {
    const { isLoaded, counter, totalBalance, list } = this.state;
    const { updateFlag, updateFlags } = this.props;

    if (updateFlags[NavAction.Screens.HOME]) { // Need Update
      this.loadAccounts();
    }

    return (
      <View style={styles.container}>
        <AppStatusBar theme={Theme.WHITE} />
        <HomeToolbar />
        <View style={[styles.container]}>
          {this.renderLoadingPanel()}
          <BalanceArea
            label="TOTAL BALANCE"
            lableColor={colors.itemTextLightGray}
            text={totalBalance}
            textColor={colors.textAreaContentsNavy}
          />
          {this.renderAccountList(isLoaded, updateFlag)}
        </View>
        <HomeIntro />
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  accounts: state.accounts.list,
  updateFlag: state.accounts.updateFlag,
  updateFlags: state.accounts.updateFlags,
});

const mapDispatchToProps = dispatch => ({
  showModal: () => dispatch(ModalAction.showModal()),
  doAction: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
