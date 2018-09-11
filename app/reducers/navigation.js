import { NavigationActions } from 'react-navigation';
import { RootNavigator } from '../AppNavigator';

const homeAction = RootNavigator.router.getActionForPathAndParams('Home');
const initialNavState = RootNavigator.router.getStateForAction(
  homeAction,
);

function navigation(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case 'Settings':
    case 'Membership':
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
