/**
 * desc：  嵌套路由子组件
 * author：DestinyJun
 * date：  2020/3/17 16:20
 */
import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class FeedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log('11111');
  }

  render() {
    return (
      <View style={[c_styles.w_100,{height: 50,backgroundColor: 'red'}]}>
        <Text>我是FeedScreen组件</Text>
      </View>
    );
  }
}
