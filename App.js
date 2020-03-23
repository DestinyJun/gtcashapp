import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// 组件
import {Icons} from './app/views/bases/Icons';
import LoginScreen from './app/views/Login/LoginScreen';
import HomeScreen from './app/views/Home/HomeScreen';
import ProFileScreen from './app/views/Home/ProFileScreen';
import supermarketScreen from './app/views/Home/supermarketScreen';
// 路由
const Stack = createStackNavigator();
const LoginStack = createStackNavigator();
const HomeTab = createBottomTabNavigator();
const HomeTabStack = createStackNavigator();
// 路由配置
const DefaultScreenOptions = {
  cardStyle: {
    backgroundColor: '#F7F7F7'
  }
};
const TabBarOptions = {
  activeTintColor: '#468F80',
  inactiveTintColor: '#C0C0C0',
  style: {
    height: 60,
    paddingBottom: 0,
  },
  labelStyle: {
    fontSize: 16,
  },
  tabStyle: {
    paddingBottom: 5,
    paddingTop: 5,
    paddingRight: 0,
    paddingLeft: 0,
  },
  allowFontScaling: true,
  adaptive: true,
};
const TabHomeScreenOption = {
  title: '主页',
};
const TabProFileScreenOption = {
  title: '我的',
};
const HomeTabStackHomeScreenOptions = {
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: '#468F80'
  },
  headerTitleStyle: {
    color: '#fff'
  }
};
// 路由分级
function HomeStackScreen() {
  return (
    <HomeTab.Navigator
      initialRouteName={'Home'}
      backBehavior={'none'}
      tabBarOptions={TabBarOptions}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'ProFile') {
            iconName = focused ? 'user-o' : 'user-o';
          }
          return <Icons iconName={iconName} badgeCount={5} size={20} color={color}/>;
        },
      })}
    >
      <HomeTab.Screen name="Home" options={TabHomeScreenOption}>
        {() => (
          <HomeTabStack.Navigator screenOptions={DefaultScreenOptions}>
            <HomeTabStack.Screen name="HomeScreen" component={HomeScreen} options={HomeTabStackHomeScreenOptions} />
            <HomeTabStack.Screen name="SuperScreen" component={supermarketScreen} />
          </HomeTabStack.Navigator>
        )}
      </HomeTab.Screen>
      <HomeTab.Screen name="ProFile" options={TabProFileScreenOption}>
        {() => (
          <HomeTabStack.Navigator>
            <HomeTabStack.Screen name="ProFileScreen" component={ProFileScreen}/>
          </HomeTabStack.Navigator>
        )}
      </HomeTab.Screen>
    </HomeTab.Navigator>
  );
}
function LoginStackScreen() {
  return (
    <LoginStack.Navigator initialRouteName={'LoginScreen'} headerMode={'none'} screenOptions={DefaultScreenOptions}>
      <LoginStack.Screen name="LoginScreen" component={LoginScreen}/>
    </LoginStack.Navigator>
  );
}
// 导出入口模块
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: false,
    };
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'HomeStackScreen'} headerMode={'none'}>
          <Stack.Screen name="HomeStackScreen" component={HomeStackScreen}/>
          <Stack.Screen name="LoginStackScreen" component={LoginStackScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
