/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import FetchPlaceSaga from './src/saga/FetchPlaceSaga'


AppRegistry.registerComponent(appName, () => App);
