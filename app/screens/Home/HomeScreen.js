import React from 'react';
import {
  ScrollView, View, Alert,
  ToastAndroid, BackHandler,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import styles from '../styles';
import strings from '../../resources/strings';

import { colors, types } from '../../resources';
import { Modal as ModalAction, Accounts as AccountsAction, Navigation as NavAction } from '../../actions';
import { retrieveAccount } from '../../libs/Transactions';

import { Theme, AppStatusBar } from '../../components/StatusBar';
import { HomeToolbar } from '../../components/Toolbar';
import { LoadingPanel } from '../../components/Panel';
import { ItemList } from '../../components/List';
import { BalanceArea } from '../../components/Text';
import AndroidBackHandler from '../../AndroidBackHandler';

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
    const { updateFlags, doAction, settings } = this.props;
    const Strings = strings[settings.language].OnBoarding.SplashScreen;

    console.log('doAction');
    doAction(AccountsAction.addUpdateFlag(NavAction.Screens.HOME));
    this.loadAccounts();
  }

  componentWillUnmount() {
    const { updateFlags, doAction } = this.props;
    const { timer, list, totalBalance } = this.state;
    if (timer) this.clearInterval(timer);
    doAction(AccountsAction.removeUpdateFlag(NavAction.Screens.HOME));
  }

  loadAccounts() {
    const { showModal, accounts, doAction, navigation, settings } = this.props;
    const { isLoading, list, totalBalance } = this.state;
    const Strings = strings[settings.language].OnBoarding.SplashScreen;
    const HomeStrings = strings[settings.language].Home;

    if (!navigation.isFocused()) return null;

    let errorFlag = false;

    this.setState({
      isLoading: true,
    });

    doAction(AccountsAction.unsetUpdateFlag(NavAction.Screens.HOME));
    // 튜토리얼 표시
    if (!accounts || accounts.length === 0) showModal();

    const lastList = list;
    const lastTotalBalance = totalBalance;

    this.setState({
      list: accounts,
    });

    // 계정 정보 로드
    return Promise.all(
      accounts.map((account, index) => (
        retrieveAccount(account.address)
          .then((data) => {
            if (data.status === 429) {
              ToastAndroid.show(HomeStrings.TOAST_ON_DELAY, ToastAndroid.SHORT);
            }

            return ({
              ...account,
              index,
              balance: data.balance,
            });
          })
      )),
    )
      .catch((e) => {
        console.log(e);
        errorFlag = true;
        Alert.alert(
          Strings.ALERT_GENERAL_TITLE,
          Strings.ALERT_NETWORK_MESSGAE,
          [
            {
              text: Strings.ALERT_BUTTON_RETRY,
              onPress: () => {
                this.loadAccounts();
              },
            },
            {
              text: Strings.ALERT_BUTTON_QUIT,
              onPress: () => {
                BackHandler.exitApp();
              },
            },
          ],
          { cancelable: false },
        );
      })
      .then((results) => {
        let total = 0;

        let nanFlag = false;

        results.forEach((account) => {
          if (isNaN(account.balance)) {
            nanFlag = true;
          }

          if (!nanFlag) {
            if (account.balance) total += account.balance;
          }
        });

        if (nanFlag) {
          total = NaN;
        }

        console.log(total);

        this.setState({
          list: results,
          totalBalance: total.toFixed(7),
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({
          list: lastList,
          totalBalance: lastTotalBalance,
        });
      })
      .then((results) => {
        if (!errorFlag) {
          SplashScreen.hide();
  
          this.setState({
            isLoaded: true,
          });
        }
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
    const { settings } = this.props;
    const Strings = strings[settings.language].Home;

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
              Strings.WALLET_EMPTY
            }
          />
        </ScrollView>
      );
    }
    return null;
  }

  renderLoadingPanel() {
    const { counter, isLoading } = this.state;
    const { settings } = this.props;
    const Strings = strings[settings.language].Home;

    if (isLoading) {
      return (
        <LoadingPanel
          ref={(c) => { this.LoadingPanel = c; }}
          text={Strings.WALLET_SYNC}
        />
      );
    }

    return null;
  }

  render() {
    const { isLoaded, isLoading, totalBalance, list } = this.state;
    const { updateFlag, updateFlags, isVisible } = this.props;

    if (!isLoading && updateFlags[NavAction.Screens.HOME]) { // Need Update
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
        <AndroidBackHandler />
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  accounts: state.accounts.list,
  settings: state.settings,
  updateFlag: state.accounts.updateFlag,
  updateFlags: state.accounts.updateFlags,
});

const mapDispatchToProps = dispatch => ({
  showModal: () => dispatch(ModalAction.showModal()),
  doAction: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
