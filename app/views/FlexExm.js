import React, { Component } from 'react';
import { View,StyleSheet, Text } from 'react-native';

export default class FlexExm extends Component {
  render() {
    return (
      <View style={styles.box1}>
        <View style={styles.box2}>
          <Text>我是孩子1</Text>
        </View>
        <View style={styles.box3}>
          <Text>我是孩子2</Text>
        </View>
        <View style={styles.box4}>
          <Text>我是孩子3</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  box1: {
    flex: 1,
    flexDirection: 'row'
  },
  box2: {
    flex: 1,
    height:50,
    backgroundColor: '#E93E43'
  },
  box3: {
    flex: 2,
    height:50,
    backgroundColor: '#F5A942'
  },
  box4: {
    flex: 3,
    height:50,
    backgroundColor: '#4EBC7A'
  }
});
