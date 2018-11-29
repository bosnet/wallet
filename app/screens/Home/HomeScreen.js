import React from 'react';
import {
  ScrollView, View, Alert, Text,
  ToastAndroid, BackHandler,
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import BigNumber from 'bignumber.js';

import styles from '../styles';
import strings from '../../resources/strings';

import { colors, types } from '../../resources';
import { Modal as ModalAction, Accounts as AccountsAction, Navigation as NavAction } from '../../actions';
import { retrieveAccount, retrieveAccounts } from '../../libs/Transactions';

import { Theme, AppStatusBar } from '../../components/StatusBar';
import { HomeToolbar } from '../../components/Toolbar';
import { LoadingPanel } from '../../components/Panel';
import { ItemList } from '../../components/List';
import { BalanceArea, HeadText } from '../../components/Text';
import AndroidBackHandler from '../../AndroidBackHandler';
import { USE_TESTNET } from '../../config/AppConfig';

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

    this.redraw = this.redraw.bind(this);
  }

  componentDidMount() {
    const { updateFlags, doAction, settings } = this.props;
    const Strings = strings[settings.language].OnBoarding.SplashScreen;

    doAction(AccountsAction.addUpdateFlag(NavAction.Screens.HOME));
    this.loadAccounts();
  }

  componentWillUnmount() {
    const { updateFlags, doAction } = this.props;
    const { timer, list, totalBalance } = this.state;
    if (timer) this.clearInterval(timer);
    doAction(AccountsAction.removeUpdateFlag(NavAction.Screens.HOME));
  }

  redraw() {
    this.setState({
      isLoaded: true,
    });
  }

  loadAccounts() {
    const { showModal, accounts, doAction, navigation, settings } = this.props;
    const { list, totalBalance, isLoaded } = this.state;
    const Strings = strings[settings.language].OnBoarding.SplashScreen;

    if (!navigation.isFocused() && isLoaded) return null;
    let errorFlag = false;

    this.setState({
      isLoading: true,
    });

    doAction(AccountsAction.unsetUpdateFlag(NavAction.Screens.HOME));
    // 튜토리얼 표시
    if (!accounts || accounts.length === 0) showModal();

    this.setState({
      list: accounts,
    });

    retrieveAccounts(accounts)
      .then((results) => {
        let total = new BigNumber(0);

        results.forEach((e) => {
          total = total.plus(e.balance);
        });

        this.setState({
          list: results,
          totalBalance: total.toFixed(7),
          isLoading: false,
        });
      })
      .catch((e) => {
        errorFlag = true;

        // console.log(e);
        // if (isLoaded) return null;

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
              text: USE_TESTNET ? Strings.ALERT_BUTTON_IGNORE : Strings.ALERT_BUTTON_QUIT,
              onPress: () => {
                if (USE_TESTNET) {
                  SplashScreen.hide();
                  this.setState({
                    isLoading: false,
                    isLoaded: true,
                    totalBalance: NaN,
                  });
                  doAction(AccountsAction.unsetUpdateFlag(NavAction.Screens.HOME));

                  errorFlag = false;
                } else {
                  BackHandler.exitApp();
                }
              },
            },
          ],
          { cancelable: false },
        );
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

    const { settings } = this.props;
    const Strings = strings[settings.language].Home;

    if (!isLoading && updateFlags[NavAction.Screens.HOME]) { // Need Update
      this.loadAccounts();
    }

    return (
      <View style={styles.container}>
        <AppStatusBar theme={Theme.WHITE} />
        <HomeToolbar
          redrawCallback={this.redraw}
        />
        <View style={[styles.container]}>
          {
              USE_TESTNET && (
                <View
                  style={{
                    marginTop: -20,
                    marginBottom: -40,
                    marginHorizontal: 10,
                  }}
                >
                  <Text
                    style={[styles.headText, { fontSize: 14, lineHeight: 20 }]}
                  >
                    {Strings.CAUTION}
                  </Text>
                </View>
              )
          }
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
