import { StackActions, NavigationActions } from 'react-navigation';
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
        StackActions.pop({
          n: action.n,
        }),
        state,
      );
      break;
    case Navigation.NAV_RESET:
      nextState = RootNavigator.router.getStateForAction(
        StackActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: Navigation.Screens.INDEXPAGE }), // 추후 삭제예정
            NavigationActions.navigate({ routeName: action.routeName }),
          ],
        }),
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
