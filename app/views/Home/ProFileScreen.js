/**
 * desc：  测试组件
 * author：DestinyJun
 * date：  2020/3/16 20:25
 */
import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';
export default class ProFileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    /*this.props.navigation.setOptions({
      title: '我的',
      headerRight: () => (
        <Button onPress={() => alert('我是Home')} title="Update count" />
      ),
    });*/
  }

  render() {
    return (
      <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}
