import React, { Component } from 'react';
import {ScrollView, Image, Text} from 'react-native';
export default class Login extends Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <ScrollView>
        <Image source={pic} style={{width: 193, height: 110}}/>
        <Text>
          我爱你
        </Text>
      </ScrollView>
    );
  }
}
