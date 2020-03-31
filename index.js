/**
 * @format
 */
import {AppRegistry} from 'react-native';
import c_styles from './app/styles/c_styles'; // 该全局文件的倒入只需一次，且需要在其他文件声明之前
import App from './App';
// import App from './app/App0';
// import App from './app/views/bases/ConTextExm';
import {name as appName} from './app.json';
AppRegistry.registerComponent(appName, () => App);
