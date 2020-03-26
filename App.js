import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, View, StatusBar} from 'react-native';
// 组件
import {Icons} from './app/views/bases/Icons';
import LoginScreen from './app/views/Login/LoginScreen';
import HomeScreen from './app/views/Home/HomeScreen';
import ProFileScreen from './app/views/ProFile/ProFileScreen';
import supermarketScreen from './app/views/Home/supermarketScreen';
// 路由
const Stack = createStackNavigator();
const LoginStack = createStackNavigator();
const TabHome = createBottomTabNavigator();
const TabHomeStack = createStackNavigator();
/********路由配置**************/
// 共有路由配置
const DefaultScreenOptions = {
  cardStyle: {
    backgroundColor: 'pink'
  },
  headerTransparent: true,
  headerTitleAlign: 'center',
  headerTitleStyle: {
    color: '#fff'
  },
  headerBackImage: () => (<Icons iconName={'angle-left'} size={30} color={'white'}/>)
};

// TabStackScreen路由配置
const TabStackScreenOptions = {
  headerShown: false
};
const TabStackHomeOptions = {
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
const TabStackHomeScreenOption = {
  title: '主页',
};
const TabStackProFileScreenOption = {
  title: '我的',
};
const TabHomeStackHomeScreenOptions = {
  headerTransparent: false,
  headerStyle: {
    backgroundColor: '#468F80'
  },
  headerTitleAlign: 'center',
  headerTitleStyle: {
    color: '#fff'
  },
};
const TabHomeStackProFileScreenOptions = {
  headerShown: false
};

// LoginScreen路由配置
const LoginScreenOptions = {
  headerShown: false
};

// 首屏路由
const LoadingScreenOptions = {
  headerShown: false
};

// 路由分级
function TabStackScreen() {
  return (
    <TabHome.Navigator
      initialRouteName={'Home'}
      backBehavior={'none'}
      tabBarOptions={TabStackHomeOptions}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'ProFile') {
            iconName = focused ? 'user-o' : 'user-o';
          }
          return <Icons iconName={iconName} badgeCount={5} size={26} color={color}/>;
        },
      })}
    >
      <TabHome.Screen name="Home" options={TabStackHomeScreenOption}>
        {() => (
          <TabHomeStack.Navigator initialRouteName={'HomeScreen'}>
            <TabHomeStack.Screen name="HomeScreen" component={HomeScreen} options={TabHomeStackHomeScreenOptions}/>
          </TabHomeStack.Navigator>
        )}
      </TabHome.Screen>
      <TabHome.Screen name="ProFile" options={TabStackProFileScreenOption}>
        {() => (
          <TabHomeStack.Navigator>
            <TabHomeStack.Screen name="ProFileScreen" component={ProFileScreen} options={TabHomeStackProFileScreenOptions}/>
          </TabHomeStack.Navigator>
        )}
      </TabHome.Screen>
    </TabHome.Navigator>
  );
}
function LoginStackScreen() {
  return (
    <LoginStack.Navigator initialRouteName={'LoginScreen'} headerMode={'none'} screenOptions={DefaultScreenOptions}>
      <LoginStack.Screen name="LoginScreen" component={LoginScreen}/>
    </LoginStack.Navigator>
  );
}

// 加载页
function LoadingScreen (){
  return (
    <View style={[c_styles.cell,c_styles.flex_center]}>
      <StatusBar hidden={true} translucent={true}/>
      <Text style={[c_styles.h3,c_styles.text_danger]}>欢迎来到收银APP</Text>
    </View>
  );
}
// 导出入口模块
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadShow: true,
    }
  }
  render() {
    if (this.state.loadShow) {
      return <LoadingScreen />
    }
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="TabStackScreen" component={TabStackScreen} options={TabStackScreenOptions}/>
          <Stack.Screen name="LoginStackScreen" component={LoginStackScreen} options={LoginScreenOptions}/>
          <Stack.Screen name="SuperScreen" component={supermarketScreen} options={DefaultScreenOptions}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
