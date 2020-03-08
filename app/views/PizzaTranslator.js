import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';

export default class PizzaTranslator extends Component {
  state = {
    text: ''
  };
  render() {
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          placeholder="请输入你先输入的"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Text style={{padding: 10, fontSize: 42}}>
          {
            console.log(this.state.text.split(' ').map((word) => word).join(' '))
          }
        </Text>
      </View>
    );
  }
}
