import React, {Component} from 'react';
import {Text, View,StyleSheet,Image} from 'react-native';
import {Card} from 'react-native-shadow-cards';
export default class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.login}>
        <View style={styles.logo}>
          <Card cornerRadius={20} opacity={10} elevation={20} style={[styles.logo_img]}>
            <Image source={require('../../assets/images/收银台.png')} style={{width: 80, height: 80}}/>
          </Card>
         {/* <View style={[styles.logo_img]}>
            <Image source={require('../../assets/images/收银台.png')} style={{width: 80, height: 80}}/>
          </View>*/}
          <View style={{marginTop: '5%'}}>
            <Text style={{color: '#5B9B8E', fontSize: 20}}>服务区收银系统</Text>
          </View>
        </View>
        <View style={styles.input}></View>
        <View style={styles.button}></View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  login:{
    flex:1,
  },
  logo: {
    flex:3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  logo_img:{
    height: 150,
    width: 150,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 3,
    backgroundColor: 'blue',
  },
  button: {
    flex:3,
    backgroundColor: 'red',
  }
});
