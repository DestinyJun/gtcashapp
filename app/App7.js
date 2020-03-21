/**
 * desc：  适配屏幕缺口以及屏幕底部虚拟按键
 * author：DestinyJun
 * date：  2020/3/20 17:47
 */
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// 路由
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

class Analytics extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
        <Text>我是Analitics</Text>
      </View>
    );
  }
}

class Profile extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
        <Text>我是Profile</Text>
      </View>
    );
  }
}

class Settings extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
        <Text>我是Settings</Text>
      </View>
    );
  }
}

class Demo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
        <Text>This is top text.</Text>
        <Text>This is bottom text.</Text>
      </SafeAreaView>
    );
  }
}

export default class App7 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" headerMode="none">
            <Stack.Screen name="Home">
              {() => (
                <Tab.Navigator initialRouteName="Analytics">
                  <Tab.Screen name="Analytics" component={Demo} />
                  <Tab.Screen name="Profile" component={Demo} />
                </Tab.Navigator>
              )}
            </Stack.Screen>
            <Stack.Screen name="Settings" component={Demo} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
