import { NavigationActions } from 'react-navigation';
import { RootNavigator } from '../AppNavigator';
import { Navigation } from '../actions';

const homeAction = RootNavigator.router.getActionForPathAndParams(Navigation.Screens.INDEXPAGE);
const initialNavState = RootNavigator.router.getStateForAction(
  homeAction,
);

function navigation(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case Navigation.NAV_PUSH:
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: action.routeName }),
        state,
      );
      break;
    case Navigation.NAV_POP:
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.back(),
        state,
      );
      break;
    default:
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: action.routeName }),
        state,
      );
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

export default navigation;
