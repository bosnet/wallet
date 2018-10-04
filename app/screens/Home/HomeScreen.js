import React from 'react';
import {
  ScrollView, View,
  AsyncStorage,
  ToastAndroid,
} from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';
import { colors, types } from '../../resources';
import { Modal as ModalAction } from '../../actions';

import { Theme, AppStatusBar } from '../../components/StatusBar';
import { HomeToolbar } from '../../components/Toolbar';
import { LoadingPanel } from '../../components/Panel';
import { ItemList } from '../../components/List';
import { BalanceArea } from '../../components/Text';
import { HomeIntro } from '../../components/Modal';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: null,
      counter: 60,
    };

    this.buildAccountList = this.buildAccountList.bind(this);
  }

  componentDidMount() {
    const {accounts, showModal} = this.props;
    if (!accounts || accounts.length === 0) showModal();
  }

  componentWillUnmount() {
    const { timer } = this.state;
    if (timer) this.clearInterval(timer);
  }

  buildAccountList() {
    const { accounts } = this.props;
    const list = [];
    accounts.forEach((account, index) => {
      list.push({
        key: `${index}`,
        type: types.ListItem.ACCOUNT,
        name: account.name,
        amount: 0,
      });
    });

    return list;
  }

  render() {
    const { counter } = this.state;
    const { accounts } = this.props;

    return (
      <View style={styles.container}>
        <AppStatusBar theme={Theme.WHITE} />
        <HomeToolbar />
        <View style={[styles.container]}>
          <LoadingPanel
            text="네트워크 동기화 중"
            subText={`${counter}초`}
          />
          <BalanceArea
            label="TOTAL BALANCE"
            lableColor={colors.itemTextLightGray}
            text="0"
            textColor={colors.textAreaContentsNavy}
          />
          <ScrollView
            contentContainerStyle={styles.alignCenter}
            showsVerticalScrollIndicator={false}
          >
            <ItemList
              listType={types.ListType.FLAT}
              listData={{
                data: this.buildAccountList(),
              }}
            />
          </ScrollView>
        </View>
        <HomeIntro />
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({ accounts: state.accounts.list });

const mapDispatchToProps = dispatch => ({
  showModal: () => dispatch(ModalAction.showModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
