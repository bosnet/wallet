import { NavigationActions } from 'react-navigation';
import { RootNavigator } from '../AppNavigator';

import { strings } from '../res/index';

const homeAction = RootNavigator.router.getActionForPathAndParams('Home');
const initialNavState = RootNavigator.router.getStateForAction(
  homeAction,
);

function navigation(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case strings.nav.Settings:
    case strings.nav.Membership:
    case strings.nav.AddressBook:
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: action.type }),
        state,
      );
      break;
    default:
      nextState = RootNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

export default navigation;
