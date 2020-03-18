import React, {Component} from 'react';
import {View,StyleSheet,ActivityIndicator} from 'react-native';
import Login from './app/views/login/Login'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: false
    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <View style={styles.container}>
       <Login />
      {/*  {this.state.showLoading?(<View style={[styles.loading]} hidden={false}>
          <ActivityIndicator size="large" color="#FF555C" marginTop={-30}/>
        </View>): null}*/}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  loading: {
    ...StyleSheet.absoluteFill,
    flex: 1,
    zIndex:9999,
    backgroundColor: 'rgba(221,221,221,0.5)',
    justifyContent: 'center'
  }
});
