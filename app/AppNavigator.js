import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import HomeScreen from './screens/HomeScreen';
import SettingMain from './screens/Settings/SettingMain';
import Membership from './screens/Settings/Membership';
import AddressBook from './screens/Settings/AddressBook';

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.navigation,
);

const RootNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Settings: { screen: SettingMain },
  Membership: { screen: Membership },
  AddressBook: { screen: AddressBook },
});

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = state => ({
  state: state.navigation,
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export { RootNavigator, AppNavigator, middleware };
