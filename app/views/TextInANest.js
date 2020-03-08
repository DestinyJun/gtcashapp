import React, { Component } from 'react';
import { Text, StyleSheet,View } from 'react-native';
import MyAppHeaderText from './MyAppHeaderText';

export default class TextInANest extends Component {
  onPressTitle = function () {
    alert('哈哈哈')
  };
  constructor(props) {
    super(props);
    this.state = {
      titleText: "Bird's Nest",
      bodyText: 'This is not really a bird nest.'
    };

  }

  render() {
    return (
      <Text style={styles.baseText}>
        <Text style={styles.titleText} onPress={this.onPressTitle}>
          {this.state.titleText}{'\n'}{'\n'}
        </Text>
        <Text numberOfLines={5}>
          {this.state.bodyText}{'\n'}{'\n'}
          <MyAppHeaderText children='我爱你'/>
        </Text>
      </Text>
    );
  }
}
const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

