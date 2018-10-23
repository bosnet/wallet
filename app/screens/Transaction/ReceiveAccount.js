import * as React from 'react';
import { View, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import styles from '../styles';
import { colors } from '../../resources';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { InputAccounts, MyAccounts, AddressBook } from './ReceiveAccountTabs';
import { Navigation as NavAction } from '../../actions';

const FirstRoute = () => (
  <View style={[styles.container, { backgroundColor: '#ffffff' }]} />
);
const SecondRoute = () => (
  <View style={[styles.container, { backgroundColor: '#ffffff' }]} />
);

export default class TabViewExample extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;

    this.state = {
      index: 0,
      routes: [
        { key: 'myAccount', title: '나의 Account' },
        { key: 'addressBook', title: '주소록' },
        { key: 'inputAddress', title: '직접입력' },
      ],
      callback: navigation.getParam('callback', null),
    };
  }

  render() {
    const { callback } = this.state;

    return (
      <View style={styles.container}>
        <AppStatusBar theme={StatusBarTheme.PURPLE} />
        <DefaultToolbar
          theme={DefaultToolbarTheme.PURPLE}
          data={{
            center: {
              title: '받는 계좌',
            },
            right: {
              actionText: '취소',
              action: NavAction.popScreen(),
            },
          }}
        />
        <TabView
          navigationState={this.state}
          // renderScene={SceneMap({
          //   myAccount: FirstRoute,
          //   addressBook: SecondRoute,
          //   inputAddress: InputAccounts,
          // })}
          renderScene={({ route }) => {
            switch (route.key) {
              case 'myAccount':
                return (
                  <MyAccounts
                    callback={callback}
                  />
                );
              case 'addressBook':
                return (
                  <AddressBook
                    callback={callback}
                  />
                );
              case 'inputAddress':
                return (
                  <InputAccounts
                    callback={callback}
                  />
                );
              default:
                return null;
            }
          }}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{
                backgroundColor: colors.indicatorWhite,
                height: 3,
                marginBottom: 2,
              }}
              style={{
                backgroundColor: colors.toolbarPurple,
              }}
              tabStyle={{ padding: 0 }}
              getLabelText={({ route }) => route.title}
              labelStyle={{
                fontFamily: 'SpoqaHanSans-Bold',
                fontSize: 14,
                color: colors.toolbarTextWhite,
              }}
            />
          )}
          onIndexChange={index => this.setState({ index })}

        />
      </View>
    );
  }
}

TabViewExample.navigationOptions = {
  header: null,
};
