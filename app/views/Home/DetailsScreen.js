/**
 * desc：  测试组件
 * author：DestinyJun
 * date：  2020/3/16 20:25
 */
import React, {Component} from 'react';
import {Button, Text, TouchableHighlight, View} from 'react-native';
export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(this.props.route.params);
    this.props.navigation.setOptions({
      headerTitle: props =>  (<View><Text>哈哈</Text></View>),
    })
  }

  render() {
    return (
      <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
        <Text>Details Screen</Text>
        <Text>{this.props.route.params.itemId}</Text>
        <Text>{this.props.route.params.otherParam}</Text>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('Home')}>
          <Text>返回主页</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.props.navigation.setParams({itemId: 1000})}>
          <Text>点击改变路由参数</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.props.navigation.setOptions({title: '详情页'})}>
          <Text>点击改变顶部通栏标题</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
