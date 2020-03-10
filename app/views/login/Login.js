import React, {Component} from 'react';
import {Text, View,StyleSheet,Image} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons"
export default class Login extends Component {
  render() {
    return (
      <View style={styles.login}>
        <View style={styles.logo}>
          <Image source={require('../../assets/images/01.jpg')}/>
        </View>
        <Text>我爱你</Text>
        <View style={styles.container}>
          <Icon name="ios-settings" size={15} color="red" />
          <Icon name="ios-settings" size={25} color="yellow" />
          <Icon name="ios-settings" size={35} color="black" />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  login:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {

  }
});
