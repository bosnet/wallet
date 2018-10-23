/** @format */
import { AppRegistry } from 'react-native';
import react from 'react';
XMLHttpRequest = GLOBAL.originalXMLHttpRequest ? 
  GLOBAL.originalXMLHttpRequest : GLOBAL.XMLHttpRequest;

import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
