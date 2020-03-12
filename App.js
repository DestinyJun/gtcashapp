import React, {Component} from 'react';
import {View,StyleSheet} from 'react-native';
import Login from './app/views/login/Login'
import c_styles from './app/styles/c_styles';
import PickerExm from './app/views/bases/PickerExm';
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Login />
        {/*<PickerExm />*/}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});
