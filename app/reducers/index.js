import { combineReducers } from 'redux';
// import { NavigationActions } from 'react-navigation';

import navigation from './navigation';

const AppReducer = combineReducers({
  navigation,
});

export default AppReducer;
