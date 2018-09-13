import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import router from './router';
import navigatorConfig from './config/stackNavigatorConfig';

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.navigation,
);

const RootNavigator = createStackNavigator(router, navigatorConfig);

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = state => ({
  state: state.navigation,
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export { RootNavigator, AppNavigator, middleware };
