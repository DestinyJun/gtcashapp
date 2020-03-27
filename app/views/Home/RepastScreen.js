/**
 * desc：  餐饮收银
 * author：DestinyJun
 * date：  2020/3/27 14:52
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default class RepastScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>握手餐饮收银</Text>
        <TouchableOpacity onPress={() => this.props.navigation.reset('MarketScreen')}>
          <Text>点击去超市</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
