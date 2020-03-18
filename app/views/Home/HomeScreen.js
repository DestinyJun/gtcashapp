/**
 * desc：  测试组件
 * author：DestinyJun
 * date：  2020/3/16 20:25
 */
import React, {Component} from 'react';
import {Text, TouchableHighlight, View, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import FeedScreen from './FeedScreen';
import MessagesScreen from './MessagesScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => alert('我是Home')} title="Update count" />
      ),
    });
  }
  render() {
    return (
      <View style={[{flex: 1, alignItems: 'center', justifyContent: 'center',paddingTop: 20}]}>
        <View style={[{backgroundColor: 'yellow',color: 'black',alignItems: 'center', justifyContent: 'center',height: 50},c_styles.w_100]}>
          <Text>我是主页</Text>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('Details',{
              itemId: 86,
              otherParam: 'anything you want here',
            })}
          >
            <Text>去详情页</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('Feed')}
          >
            <Text>去详FeedScreen</Text>
          </TouchableHighlight>
        </View>
        <View style={[{backgroundColor: 'blue',color: 'black',alignItems: 'center', justifyContent: 'center',height: 50},c_styles.w_100]}>
          <Tab.Navigator initialRouteName="Feed">
            <Tab.Screen name="Feed" component={FeedScreen} />
            <Tab.Screen name="Messages" component={MessagesScreen} />
          </Tab.Navigator>
        </View>
      </View>
    );
  }
}
