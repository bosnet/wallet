import * as React from 'react';
import { View, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { connect } from 'react-redux';

import styles from '../styles';
import { colors } from '../../resources';
import strings from '../../resources/strings';

import { Theme as StatusBarTheme, AppStatusBar } from '../../components/StatusBar';
import { DefaultToolbar, DefaultToolbarTheme } from '../../components/Toolbar';
import { InputAccounts, MyAccounts, AddressBook } from './ReceiveAccountTabs';
import { Navigation as NavAction } from '../../actions';
import AndroidBackHandler from '../../AndroidBackHandler';

const FirstRoute = () => (
  <View style={[styles.container, { backgroundColor: '#ffffff' }]} />
);
const SecondRoute = () => (
  <View style={[styles.container, { backgroundColor: '#ffffff' }]} />
);

class TabViewExample extends React.Component {
  constructor(props) {
    super(props);

    const { navigation } = this.props;

    const { settings } = this.props;
    const Strings = strings[settings.language].Transactions.ReceiveAccount;

    this.state = {
      index: 0,
      routes: [
        { key: 'myAccount', title: Strings.TAB1_TITLE },
        { key: 'addressBook', title: Strings.TAB2_TITLE },
        { key: 'inputAddress', title: Strings.TAB3_TITLE },
      ],
      callback: navigation.getParam('callback', null),
    };
  }

  render() {
    const { callback } = this.state;
    const { settings } = this.props;
    const Strings = strings[settings.language].Transactions.ReceiveAccount;

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
        <AndroidBackHandler />
      </View>
    );
  }
}

TabViewExample.navigationOptions = {
  header: null,
};

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({});


export default connect(mapStateToProps, mapDispatchToProps)(TabViewExample);
