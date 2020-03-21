/**
 * Drawer navigation导航的基础使用（1）
 * author：DestinyJun
 * date：  2020/3/18 11:34
 */
import React, {Component} from 'react';
import {View,Text, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>我是home</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Notifications')}
          title="去notifications页"
        />
        <Button
          onPress={() => this.props.navigation.openDrawer()}
          title="打开抽屉"
        />
        <Button
          onPress={() => this.props.navigation.closeDrawer()}
          title="关闭抽屉"
        />
      </View>
    );
  }
}
class NotificationsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>我是Notifications</Text>
        <Button onPress={() => this.props.navigation.goBack()} title="点击去home" />
      </View>
    );
  }
}

const Drawer  = createDrawerNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
