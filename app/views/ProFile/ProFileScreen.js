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
      <View style={[{ flex: 1}]}>
        <View style={[{height: 30,width: '100%',backgroundColor: 'rgba(23,23,23,0.5)'}]}>

        </View>
      </View>
    );
  }
}
