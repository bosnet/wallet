// import { NavigationActions } from 'react-navigation';
import { RootNavigator } from '../AppNavigator';
import { Navigation } from '../actions';

const homeAction = RootNavigator.router.getActionForPathAndParams(Navigation.Screens.HOME);
const initialNavState = RootNavigator.router.getStateForAction(
  homeAction,
);

function navigation(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    default:
      nextState = RootNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

export default navigation;
