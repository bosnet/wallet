import { combineReducers } from 'redux';
// import { NavigationActions } from 'react-navigation';

import navigation from './navigation';
import modal from './modal';
import accounts from './accounts';

const AppReducer = combineReducers({
  navigation,
  modal,
  accounts,
});

export default AppReducer;
