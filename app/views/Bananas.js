import React, { Component } from 'react';
import { Image,View,Text } from 'react-native';

class Greeting extends Component {
  render() {
    return (
      <View style={{alignItems: 'center', marginTop: 50}}>
        <Text>Hello {this.props.name}!</Text>
      </View>
    );
  }
}

export default class Bananas extends Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <View style={{alignItems: 'center'}}>
        <Greeting name='Rexxar' />
        <Image source={pic} style={{width: 193, height: 110}} />
      </View>
    );
  }
}
