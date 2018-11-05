import { combineReducers } from 'redux';
// import { NavigationActions } from 'react-navigation';

import navigation from './navigation';
import modal from './modal';
import accounts from './accounts';
import settings from './settings';
import addressBook from './addressbook';
import recentAddress from './recentAddress';

const AppReducer = combineReducers({
  navigation,
  modal,
  accounts,
  settings,
  addressBook,
  recentAddress,
});

export default AppReducer;
