import React, {Component} from 'react';
import {Text,StyleSheet} from 'react-native';

export default class MyAppHeaderText extends Component {
  render() {
    return (
      <Text style={[styles.color_red]}>{this.props.children}</Text>
    );
  }
}
const styles = StyleSheet.create({
  color_red: {
    color: 'blue',
    fontSize: 20
  }
});
