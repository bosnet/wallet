/**
 * Sample React Native App
 * httpss://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Platform,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import SortableList from 'react-native-sortable-list';

import styles from '../styles';
import itemStyle from '../../components/List/styles';
import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { ItemList } from '../../components/List';
import { AlertPanel } from '../../components/Panel';

import icEmpty from '../../resources/images/empty.png';
import { colors, types } from '../../resources';
import icMove from '../../resources/images/ic_move.png';


const window = Dimensions.get('window');


const createLayout = (data) => {
  let returnLayout = null;
  if (!data || data.length === 0) {
    returnLayout = (
      <View style={styles.centerLayout}>
        <AlertPanel
          icon={icEmpty}
          color={colors.alertTextLightGrey}
          text={
            '아직 등록된\n'
            + 'Account가 없습니다'
          }
        />
      </View>
    );
  }

  return returnLayout;
};

class SortAccounts extends Component {
  render() {
    const { accounts } = this.props;

    return (
      <View style={styles.container}>
        <AppStatusBar theme={StatusBarTheme.PURPLE} />
        <DefaultToolbar
          theme={DefaultToolbarTheme.PURPLE}
          data={{
            center: {
              title: 'Account 순서 변경',
            },
            right: {
              actionText: '닫기',
            },
          }}
        />
        <SortableList
          style={itemStyle.itemList}
          contentContainerStyle={styles.contentContainer}
          data={accounts}
          renderRow={this._renderRow}
          manuallyActivateRows={true}
        />
      </View>
    );
  }

  _renderRow = ({data, active, toggleRowActive}) => {
    return <Row account={data} active={active} toggleRowActive={toggleRowActive}/>
  }
}

class Row extends Component {

  constructor(props) {
    super(props);
  }


  render() {
   const {account, active, toggleRowActive} = this.props;

    return (
      <View style={[
        itemStyle.listItem,
      ]}>
        <Text style={[itemStyle.itemText, { color: colors.itemTextBlack }]}>
          {account.name}
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPressIn={() => {toggleRowActive()}}
        >
          <Image style={itemStyle.itemMove} source={icMove} />
        </TouchableOpacity>
      </View>
    );
  }
}

SortAccounts.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  accounts: state.accounts.list,
});

const mapDispatchToProps = dispatch => ({
  doAction: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(SortAccounts);
