import { StackActions, NavigationActions } from 'react-navigation';
import { RootNavigator } from '../AppNavigator';
import { Navigation } from '../actions';

const homeAction = RootNavigator.router.getActionForPathAndParams(Navigation.Screens.HOME);
const initialNavState = RootNavigator.router.getStateForAction(
  homeAction,
);

function navigation(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case Navigation.NAV_PUSH:
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({
          routeName: action.routeName,
          key: action.key,
          params: action.params,
        }),
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
    case Navigation.NAV_BACK:
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.back({
          key: action.routeName,
        }),
        state,
      );
      break;
    case Navigation.NAV_RESET:
      nextState = RootNavigator.router.getStateForAction(
        StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: action.routeName,
              key: action.key,
              params: action.params,
            }),
          ],
        }),
        state,
      );
      break;
    case Navigation.NAV_RESET_TO_LIST:
      console.log('\n\n\nparams');
      console.log(JSON.stringify(action.params));
      nextState = RootNavigator.router.getStateForAction(
        StackActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({
              routeName: Navigation.Screens.HOME,
              key: Navigation.Screens.HOME,
            }),
            NavigationActions.navigate({
              routeName: Navigation.Screens.TRANSACTION_LIST,
              key: `${Navigation.Screens.TRANSACTION_LIST}${action.params.account.address}`,
              params: action.params,
            }),
          ],
        }),
        state,
      );
      break;
    case Navigation.NAV_RESET_TO_CONTACTS:
      nextState = RootNavigator.router.getStateForAction(
        StackActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({
              routeName: Navigation.Screens.HOME,
              key: Navigation.Screens.HOME,
            }),
            NavigationActions.navigate({
              routeName: Navigation.Screens.ADDRESSBOOK,
              key: Navigation.Screens.ADDRESSBOOK,
              params: action.params,
            }),
          ],
        }),
        state,
      );
      break;
    default:
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: action.routeName, params: action.params }),
        state,
      );
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

export default navigation;
