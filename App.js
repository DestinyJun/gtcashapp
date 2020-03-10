import React, {Component} from 'react';
import {View,StyleSheet} from 'react-native';
import Login from './app/views/login/Login'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Login />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});
