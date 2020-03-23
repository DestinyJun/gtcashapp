/**
 * desc：  测试组件
 * author：DestinyJun
 * date：  2020/3/16 20:25
 */
import React, {Component} from 'react';
import {Text, TouchableHighlight, View, Button} from 'react-native';
import {Constant} from '../../util';
import {HomeScreenStyle} from './HomeScreenStyle';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.navigation.setOptions({
      title: '中医超市',
    });
  }
  render() {
    return (
      <View style={[HomeScreenStyle.home]}>
        {
          Constant.MENU_LIST.map((item,index) => (
            <TouchableHighlight
              key={index}
              style={[HomeScreenStyle.home_card]}
              onPress={() => this.props.navigation.navigate('SuperScreen',{
                itemId: 86,
                otherParam: 'anything you want here',
              })}
            >
              <Text>{item.title}</Text>
            </TouchableHighlight>
          ))
        }
      </View>
    );
  }
}
